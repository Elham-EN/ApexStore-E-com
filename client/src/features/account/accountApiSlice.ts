import { baseQueryWithErrorHandling } from "@/app/api/baseApi";
import type { User } from "@/app/models/User";
import { createApi } from "@reduxjs/toolkit/query/react";

export const accountApiSlice = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    login: builder.mutation<void, object>({
      query: (credentials) => {
        return {
          url: "login?useCookies=true",
          method: "POST",
          body: credentials,
        };
      },
    }),
    register: builder.mutation<void, object>({
      query: (credentials) => {
        return {
          url: "Account/register",
          method: "POST",
          body: credentials,
        };
      },
    }),
    userInfo: builder.query<User, void>({
      query: () => "Account/user-info",
    }),
    logout: builder.mutation({
      query: () => ({
        url: "Account/logout",
        method: "Post",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUserInfoQuery,
} = accountApiSlice;
