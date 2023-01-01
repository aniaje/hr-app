import { dataApiSlice } from "../api";

const candidatesApi = dataApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCandidates: builder.query({
      query: () => ({
        url: "/candidates",
        method: "GET"
      }),
      providesTags: ["Candidate"]
    }),

    getOneCandidate: builder.query({
      query: (id) => `/candidates/${id}`
    }),

    deleteCandidate: builder.mutation<{ success: boolean; id: number }, number>(
      {
        query: (id) => ({
          url: `/candidates/${id}`,
          method: "DELETE"
        }),
        invalidatesTags: ["Candidate"]
      }
    ),
    addCandidate: builder.mutation({
      query: (candidate) => ({
        url: "/candidates",
        method: "POST"
      }),
      invalidatesTags: ["Candidate"]
    })
  }),
  overrideExisting: false
});

export const {
  useGetAllCandidatesQuery,
  useAddCandidateMutation,
  useDeleteCandidateMutation,
  useGetOneCandidateQuery
} = candidatesApi;
