import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

type BadRequestError = {
  message: string;
};

type OtherError = {
  status: number;
  title: string;
  detail: string;
};

type ValidationError = {
  errors: {
    // Dynamic property names with array of error messages
    [key: string]: string[];
  };
  status: number;
  title: string;
};

const customBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL as string,
  credentials: "include",
});

// Fake Delay
const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  // Start Loading
  // api.dispatch is a Redux store dispatch function that lets you
  // dispatch actions to your Redux store from within the base query.
  api.dispatch(startLoading());
  if (import.meta.env.DEV) await sleep();
  // Fetching data from API
  const result = await customBaseQuery(args, api, extraOptions);
  // Stop Loading
  api.dispatch(stopLoading());
  if (result.error) {
    const { status, data } = result.error;

    switch (status) {
      case 400: {
        // Check if it is validation error type
        if (typeof data === "object" && data !== null && "errors" in data) {
          const validationError = data as ValidationError;
          const errorArray = Object.values(validationError.errors).flat();
          // ✅ RETURN error object with custom data
          // RTK Query baseQuery is like a pipeline - it expects you to return
          // results (success or error), not throw exception
          return {
            error: {
              status: 400,
              data: {
                validationErrors: errorArray,
                isValidationError: true,
              },
            },
          };
        } else {
          const badRequestMessage = data as BadRequestError;
          toast.error(badRequestMessage.message);
        }
        break;
      }
      case 401: {
        const unauthorizedError = data as OtherError;
        toast.error(unauthorizedError.title);
        break;
      }
      case 404: {
        const notFoundError = data as OtherError;
        router.navigate("/not-found", { state: { error: notFoundError } });
        break;
      }
      case 500: {
        const serverError = data as OtherError;
        router.navigate("/server-error", {
          // Send navigation state data to route "/server-error"
          state: { error: serverError },
        });
        break;
      }
      default:
        break;
    }
  }
  return result;
};
