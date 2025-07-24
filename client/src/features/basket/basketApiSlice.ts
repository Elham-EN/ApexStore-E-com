import { baseQueryWithErrorHandling } from "@/app/api/baseApi";
import type { Basket } from "@/app/models/Basket";
import { createApi } from "@reduxjs/toolkit/query/react";

type MutateBasketItem = {
  productId: number;
  quantity: number;
};

export const basketApiSlice = createApi({
  reducerPath: "basketApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => "/Basket",
      providesTags: ["Basket"],
    }),
    addBasketItem: builder.mutation<Basket, MutateBasketItem>({
      query: ({ productId, quantity }) => ({
        url: `/Basket?productId=${productId}&quantity=${quantity}`,
        method: "POST",
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(basketApiSlice.util.invalidateTags(["Basket"]));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    removeBasketItem: builder.mutation<void, MutateBasketItem>({
      query: ({ productId, quantity }) => ({
        url: `/Basket?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFetchBasketQuery, useAddBasketItemMutation } = basketApiSlice;
