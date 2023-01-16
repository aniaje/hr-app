import { dataApiSlice } from "../api";
import { APITags } from "../enums";

const candidatesApi = dataApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCandidates: builder.query({
      query: () => ({
        url: "/candidates",
        method: "GET",
      }),
      providesTags: [APITags.Candidate],
    }),

    getOneCandidate: builder.query({
      query: (id) => `/candidates/${id}`,
    }),

    deleteCandidate: builder.mutation<{ success: boolean; id: number }, number>(
      {
        query: (id) => ({
          url: `/candidates/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [APITags.Candidate],
      }
    ),
    addCandidate: builder.mutation({
      query: (body: {
        name: string;
        companyName: string;
        logo: string;
        longDescription: string;
        shortDescription: string;
        position: string;
        email: string;
      }) => ({
        url: "/candidates",
        method: "POST",
        body,
      }),
      invalidatesTags: [APITags.Candidate],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCandidatesQuery,
  useAddCandidateMutation,
  useDeleteCandidateMutation,
  useGetOneCandidateQuery,
} = candidatesApi;
