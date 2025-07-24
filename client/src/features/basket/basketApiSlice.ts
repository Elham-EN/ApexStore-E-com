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
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => "/Basket",
    }),
    addBasketItem: builder.mutation<Basket, MutateBasketItem>({
      query: ({ productId, quantity }) => ({
        url: `/Basket?productId=${productId}&quantity${quantity}`,
        method: "POST",
      }),
    }),
    removeBasketItem: builder.mutation<void, MutateBasketItem>({
      query: ({ productId, quantity }) => ({
        url: `/Basket?productId=${productId}&quantity${quantity}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFetchBasketQuery } = basketApiSlice;
