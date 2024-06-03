import { apiSlice } from "./apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (category) => `/api/products/category/${category}`,
            providesTags: ["Product"],
        }),
        getProduct: builder.query({
            query: (id) => `/api/products/${id}`,
            providesTags: ["Product"],
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: "/api/products",
                method: "POST",
                body: product,
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
} = productsApiSlice;
