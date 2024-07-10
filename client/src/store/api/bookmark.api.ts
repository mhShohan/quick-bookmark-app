import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const bookmarkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getAllBookmark: build.query({
      query: (query) => ({
        url: "/bookmarks",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.bookmark],
    }),

    addNewBookmark: build.mutation({
      query: (payload) => ({
        url: "/bookmarks",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [tagTypes.bookmark],
    }),

    deleteBookmark: build.mutation({
      query: (id) => ({
        url: "/bookmarks/" + id,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.bookmark],
    }),

  }),
});


export const {
  useGetAllBookmarkQuery,
  useAddNewBookmarkMutation,
  useDeleteBookmarkMutation,
} = bookmarkApi;