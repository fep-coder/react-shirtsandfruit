import { apiSlice } from "./apiSlice";

const pagesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPages: builder.query({
            query: () => "/api/pages",
            providesTags: ["Page"],
        }),
        getPage: builder.query({
            query: (slug) => `/api/pages/${slug}`,
            providesTags: ["Page"],
        }),
        reorderPages: builder.mutation({
            query: (pages) => ({
                url: "/api/pages/reorder",
                method: "POST",
                body: pages,
            }),
            invalidatesTags: ["Page"],
        }),
        addPage: builder.mutation({
            query: (page) => ({
                url: "/api/pages",
                method: "POST",
                body: page,
            }),
            invalidatesTags: ["Page"],
        }),
        editPage: builder.mutation({
            query: (page) => ({
                url: `/api/pages/${page.id}`,
                method: "PUT",
                body: page,
            }),
            invalidatesTags: ["Page"],
        }),
        deletePage: builder.mutation({
            query: (id) => ({
                url: `/api/pages/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Page"],
        }),
    }),
});

export const {
    useGetPagesQuery,
    useGetPageQuery,
    useReorderPagesMutation,
    useAddPageMutation,
    useEditPageMutation,
    useDeletePageMutation,
} = pagesApiSlice;
