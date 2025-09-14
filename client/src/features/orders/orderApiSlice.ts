import { baseQueryWithErrorHandling } from "@/app/api/baseApi";
import { type CreateOrder, type Order } from "@/app/models/Order";
import { createApi } from "@reduxjs/toolkit/query/react";

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchOrders: builder.query<Order[], void>({
      query: () => "/Orders",
    }),
    fetchOrderDetailed: builder.query<Order, number>({
      query: (id) => ({
        url: `/Orders/${id}`,
      }),
    }),
    createOrder: builder.mutation<Order, CreateOrder>({
      query: (order) => ({
        url: "/Orders",
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const {
  useFetchOrdersQuery,
  useFetchOrderDetailedQuery,
  useCreateOrderMutation,
} = orderApiSlice;
