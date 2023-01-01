import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "auth/common";

export const dataApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9595/",
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
  tagTypes: ["Job", "Candidate"],
  endpoints: () => ({}),
});
