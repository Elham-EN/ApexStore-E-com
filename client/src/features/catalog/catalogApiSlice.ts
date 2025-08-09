import { baseQueryWithErrorHandling } from "@/app/api/baseApi";
import type { Product } from "@/app/models/Product";
import type { ProductParams } from "@/app/models/ProductParams";
import { filterEmptyValuesFromObj } from "@/lib/util";
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
    fetchProducts: builder.query<Product[], ProductParams>({
      query: (productParams) => {
        // Removes empty, null, undefined values and empty arrays
        // from productParams object
        const paramsFilteredObj = filterEmptyValuesFromObj(productParams);
        return {
          url: "/Products",
          // Append to the URL query string e.g /Products?pageSize=8
          params: paramsFilteredObj,
        };
      },
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
