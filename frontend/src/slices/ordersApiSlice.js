import { apiSlice } from "./apiSlice";

const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: "/api/orders",
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["Order"],
        }),
    }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
