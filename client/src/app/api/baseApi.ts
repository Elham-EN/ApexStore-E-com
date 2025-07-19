import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";

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
  await sleep();
  const result = await customBaseQuery(args, api, extraOptions);
  // Stop Loading
  if (result.error) {
    const { status, data } = result.error;
    console.log({ status, data });
  }
  return result;
};
