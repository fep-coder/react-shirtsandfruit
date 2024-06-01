import { apiSlice } from "./apiSlice";

const pagesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPages: builder.query({
            query: () => "/api/pages",
            providesTags: ["Page"],
        }),
    }),
});

export const { useGetPagesQuery } = pagesApiSlice;
