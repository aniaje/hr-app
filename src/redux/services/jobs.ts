import { dataApiSlice } from "../api";

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
      providesTags: ["Job"]
    }),

    getOneJob: builder.query({
      query: (id) => `/jobs/${id}`,
      providesTags: ["Job"]
    }),

    deleteJob: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Job"]
    }),

    addJob: builder.mutation({
      query: (job: IJob) => ({
        url: "/jobs",
        method: "POST"
      }),
      invalidatesTags: ["Job"]
    })
  }),
  overrideExisting: false
});

export const {
  useGetAllJobsQuery,
  useAddJobMutation,
  useDeleteJobMutation,
  useGetOneJobQuery
} = jobsApi;
