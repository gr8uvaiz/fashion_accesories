import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Products", "Product", "AdminProducts"],
  endpoints: (builder) => ({
    // Get all products (public - only active)
    getProducts: builder.query({
      query: ({ page = 1, limit = 9, search = "", category = "" } = {}) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (category) params.append("category", category);
        return `/products?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),

    // Get all products (admin - includes inactive)
    getAllProductsAdmin: builder.query({
      query: () => "/products/admin/all",
      transformResponse: (response: any) => response.products || [],
      providesTags: ["AdminProducts"],
    }),

    // Get single product
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      transformResponse: (response: any) => response.product,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    // Create product (admin)
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    // Update product (admin)
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Products",
        "AdminProducts",
        { type: "Product", id },
      ],
    }),

    // Delete product (admin)
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "AdminProducts"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAllProductsAdminQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiSlice;
