import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:7214/api",
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
  await sleep();
  // Fetching data from API
  const result = await customBaseQuery(args, api, extraOptions);
  // Stop Loading
  api.dispatch(stopLoading());
  if (result.error) {
    const { status, data } = result.error;
    console.log({ status, data });
  }
  return result;
};
