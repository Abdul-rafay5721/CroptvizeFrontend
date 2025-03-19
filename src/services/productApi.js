import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (body) => ({
                url: "/product/createProduct",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Product"],
        }),
        getProducts: builder.query({
            query: (params = {}) => {
                const {
                    page = 1,
                    limit = 10,
                    search = "",
                    category = "",
                    sort = "newest",
                    minPrice,
                    maxPrice,
                    minRating,
                    featured
                } = params;

                // Build the query string with all parameters
                let queryString = `/product/getProducts?page=${page}&limit=${limit}`;

                if (search) queryString += `&search=${encodeURIComponent(search)}`;
                if (category) queryString += `&category=${encodeURIComponent(category)}`;
                if (sort) queryString += `&sort=${sort}`;
                if (minPrice) queryString += `&minPrice=${minPrice}`;
                if (maxPrice) queryString += `&maxPrice=${maxPrice}`;
                if (minRating) queryString += `&minRating=${minRating}`;
                if (featured) queryString += `&featured=${featured}`;

                return queryString;
            },
            providesTags: ["Product"],
        }),
        getProductById: builder.query({
            query: (id) => `/product/getProduct/${id}`,
            providesTags: ["Product"],
        }),
        updateProduct: builder.mutation({
            query: ({ id, body }) => ({
                url: `/product/updateProduct/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/deleteProduct/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
    }),
})

export const {
    useAddProductMutation,
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi