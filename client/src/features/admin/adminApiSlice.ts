import { baseQueryWithErrorHandling } from "@/app/api/baseApi";
import { type Product } from "@/app/models/Product";
import { type CreateProductSchema } from "@/lib/schemas/createProductSchema";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    createProduct: builder.mutation<Product, CreateProductSchema>({
      query: (data: CreateProductSchema) => {
        return {
          url: "/Products",
          method: "POST",
          body: data,
        };
      },
    }),
    updateProduct: builder.mutation<
      void,
      { id: number; data: CreateProductSchema }
    >({
      query: ({ id, data }) => {
        return {
          url: "/Products",
          method: "PUT",
          body: { ...data, id },
        };
      },
    }),
  }),
});

export const { useCreateProductMutation, useUpdateProductMutation } = adminApi;
