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
        editProduct: builder.mutation({
            query: (product) => ({
                url: `/api/products/${product.get("id")}`,
                method: "PUT",
                body: product,
            }),
            invalidatesTags: ["Product"],
        }),
        uploadMultipleImages: builder.mutation({
            query: (formData) => ({
                url: `/api/products/multiupload/${formData.get("id")}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Product"],
        }),
        getProductImages: builder.query({
            query: (id) => `/api/products/images/${id}`,
            providesTags: ["Product"],
        }),
        deleteGalleryImage: builder.mutation({
            query: (data) => ({
                url: `/api/products/deleteimage`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/api/products/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useEditProductMutation,
    useUploadMultipleImagesMutation,
    useGetProductImagesQuery,
    useDeleteGalleryImageMutation,
    useDeleteProductMutation,
} = productsApiSlice;
