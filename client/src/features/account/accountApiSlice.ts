import { baseQueryWithErrorHandling } from "@/app/api/baseApi";
import type { User } from "@/app/models/User";
import { router } from "@/app/routes/Routes";
import type { LoginSchema } from "@/lib/schemas/loginSchema";
import type { RegisterSchema } from "@/lib/schemas/registerSchema";
import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

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
    register: builder.mutation<void, RegisterSchema>({
      query: (credentials) => {
        return {
          url: "Account/register",
          method: "POST",
          body: credentials,
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Registration successful - you can now sign in");
          router.navigate("/login");
        } catch (error) {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
          throw error;
        }
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
  useLazyUserInfoQuery,
} = accountApiSlice;
