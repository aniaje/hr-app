import { dataApiSlice } from "../api";
import { APITags } from "../enums";

export interface IJob {
  companyName: string;
  date: string;
  id: number;
  logo: string;
  longDescription: string;
  shortDescription: string;
  title: string;
}

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
      query: (job: IJob) => ({
        url: "/jobs",
        method: "POST",
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
