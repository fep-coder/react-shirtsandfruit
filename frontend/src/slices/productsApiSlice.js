import { apiSlice } from "./apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (category) => `/api/products/category/${category}`,
            providesTags: ["Product"],
        }),
    }),
});

export const { useGetProductsQuery } = productsApiSlice;