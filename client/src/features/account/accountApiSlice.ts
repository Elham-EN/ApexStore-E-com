import { baseQueryWithErrorHandling } from "@/app/api/baseApi";
import type { User } from "@/app/models/User";
import { router } from "@/app/routes/Routes";
import type { LoginSchema } from "@/lib/schemas/loginSchema";
import { createApi } from "@reduxjs/toolkit/query/react";

export const accountApiSlice = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["UserInfo"],
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginSchema>({
      query: (credentials) => {
        return {
          url: "login?useCookies=true",
          method: "POST",
          body: credentials,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(accountApiSlice.util.invalidateTags(["UserInfo"]));
        } catch (error) {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
        }
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
      providesTags: ["UserInfo"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "Account/logout",
        method: "Post",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountApiSlice.util.invalidateTags(["UserInfo"]));
        router.navigate("/");
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUserInfoQuery,
} = accountApiSlice;
