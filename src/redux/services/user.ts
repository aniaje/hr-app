import { dataApiSlice } from "../api";

export const userSlice = dataApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (body: {
        firstname: string;
        lastname: string;
        username: string;
        password: string;
      }) => ({
        url: "app/auth/register",
        method: "POST",
        body,
      }),
    }),
    signinUser: builder.mutation({
      query: (body: { username: string; password: string }) => ({
        url: "app/auth/login",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "app/profile",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useSigninUserMutation, useSignupUserMutation, useGetUserQuery } =
  userSlice;
