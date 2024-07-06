import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const demoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    get: build.query({
      query: () => ({
        url: "/",
        method: "GET"
      }),
      providesTags: [tagTypes.demo],
    }),

    add: build.mutation({
      query: (payload) => ({
        url: "/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [tagTypes.demo],
    }),

  }),
});


export const { useGetQuery, useAddMutation } = demoApi;