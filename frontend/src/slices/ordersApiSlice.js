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
        getUserOrders: builder.query({
            query: () => "/api/orders/profile",
            providesTags: ["Order"],
        }),
    }),
});

export const { useCreateOrderMutation, useGetUserOrdersQuery } = ordersApiSlice;
