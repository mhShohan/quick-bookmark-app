import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getProfile: build.query({
      query: () => ({
        url: "/auth/self",
        method: "GET"
      }),
      providesTags: [tagTypes.user],
    }),


  }),
});


export const { useGetProfileQuery } = profileApi;