import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const folderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getAllFolder: build.query({
      query: () => ({
        url: "/folders",
        method: "GET"
      }),
      providesTags: [tagTypes.folder],
    }),

    addNewFolder: build.mutation({
      query: (payload) => ({
        url: "/folders",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [tagTypes.folder],
    }),

  }),
});


export const { useGetAllFolderQuery, useAddNewFolderMutation } = folderApi;