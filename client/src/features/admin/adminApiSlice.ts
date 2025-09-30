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
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("type", data.type);
        formData.append("brand", data.brand);
        formData.append("quantityInStock", data.quantityInStock.toString());

        if (data.file) {
          formData.append("file", data.file);
        }

        return {
          url: "Products",
          method: "POST",
          body: formData,
        };
      },
    }),
    updateProduct: builder.mutation<
      void,
      { id: number; data: CreateProductSchema }
    >({
      query: ({ id, data }) => {
        const formData = new FormData();
        formData.append("id", id.toString());
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("type", data.type);
        formData.append("brand", data.brand);
        formData.append("quantityInStock", data.quantityInStock.toString());

        if (data.file) {
          formData.append("file", data.file);
        }

        return {
          url: "Products",
          method: "PUT",
          body: formData,
        };
      },
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id: number) => {
        return {
          url: `Products/id?id=${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminApi;
