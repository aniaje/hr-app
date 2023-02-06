import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "auth/common";
import { APITags } from "./enums";

export const dataApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hr-dashboard-api.onrender.com/",
    prepareHeaders: (headers) => {
      if (getTokenFromLocalStorage()) {
        headers.set(
          "Authorization",
          `Bearer ${getTokenFromLocalStorage()}` as string
        );
      }
      return headers;
    },
  }),
  tagTypes: [APITags.Candidate, APITags.Job],
  endpoints: () => ({}),
});
