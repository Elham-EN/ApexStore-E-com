import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseApi";

export const errorApiSlice = createApi({
  reducerPath: "errorApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    get400Error: builder.query<void, void>({
      query: () => "/ErrorTest/bad-request",
    }),
    get404Error: builder.query<void, void>({
      query: () => "/ErrorTest/not-found",
    }),
    get401Error: builder.query<void, void>({
      query: () => "/ErrorTest/unauthorized",
    }),
    get500Error: builder.query<void, void>({
      query: () => "/ErrorTest/server-error",
    }),
    getValidationError: builder.query<void, void>({
      query: () => "/ErrorTest/validation-error",
    }),
  }),
});

export const {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetValidationErrorQuery,
} = errorApiSlice;
