import { apiSlice } from "./apiSlice";

const ratingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRating: builder.mutation({
            query: (rating) => ({
                url: "/api/ratings",
                method: "POST",
                body: rating,
            }),
            invalidatesTags: ["Rating"],
        }),
        getRatingByUserAndProduct: builder.query({
            query: (productId) => ({
                url: `/api/ratings/user/${productId}`,
                providesTags: ["Rating"],
            }),
        }),
    }),
});

export const { useCreateRatingMutation, useGetRatingByUserAndProductQuery } =
    ratingsApiSlice;
