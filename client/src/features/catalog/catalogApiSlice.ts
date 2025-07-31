import { baseQueryWithErrorHandling } from "@/app/api/baseApi";
import type { Product } from "@/app/models/Product";
import { createApi } from "@reduxjs/toolkit/query/react";

type Filters = {
  brands: string[];
  types: string[];
};

// Define our single API slice object
export const catalogApiSlice = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => "/Products",
    }),
    fetchProduct: builder.query<Product, number>({
      query: (productId) => `/Products/id?id=${productId}`,
    }),
    fetchFilters: builder.query<Filters, void>({
      query: () => "products/filters",
    }),
  }),
});

export const {
  useFetchProductQuery,
  useFetchProductsQuery,
  useFetchFiltersQuery,
} = catalogApiSlice;
