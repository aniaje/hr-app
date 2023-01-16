import { dataApiSlice } from "../api";
import { APITags } from "../enums";

const jobsApi = dataApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => "jobs",
      providesTags: [APITags.Job],
    }),

    getOneJob: builder.query({
      query: (id) => `/jobs/${id}`,
      providesTags: [APITags.Job],
    }),

    deleteJob: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [APITags.Job],
    }),

    addJob: builder.mutation({
      query: (body: {
        title: string;
        shortDescription: string;
        longDescription: string;
        logo: string;
        companyName: string;
      }) => ({
        url: "/jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: [APITags.Job],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllJobsQuery,
  useAddJobMutation,
  useDeleteJobMutation,
  useGetOneJobQuery,
} = jobsApi;
