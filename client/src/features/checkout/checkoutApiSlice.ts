import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "@/app/api/baseApi";
import { type Basket } from "@/app/models/Basket";
import { basketApiSlice } from "../basket/basketApiSlice";

export const checkoutApiSlice = createApi({
  reducerPath: "checkoutApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    // Create Payment Intent when user visit the checkout page & everytime
    // they visit the checkout, must update the payment intent because when
    // they come to checkout, they might decide to continue shopping from there
    // and when they update their basket & comeback to checkout, need to update
    // payment intent again, so the amount match their updated basket
    createPaymentIntent: builder.mutation<Basket, void>({
      query: () => {
        return {
          url: "Payments",
          method: "POST",
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            basketApiSlice.util.updateQueryData(
              "fetchBasket",
              undefined,
              (draft) => {
                // Client app only need clientSecret
                draft.clientSecret = data.clientSecret;
              }
            )
          );
        } catch (error) {
          console.log("Payment intent creation failed", error);
        }
      },
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = checkoutApiSlice;
