import { apiSlice } from "./apiSlice";
import { IDBResponseDT } from '@/types/db-response-dt';
import { IReview, ISaveReview } from "@/types/review-d-t";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all review
    getReviewByProductId: builder.query<IDBResponseDT<IReview[]>, number>({
      query: (id) => `/review/product-review/${id}`,
      providesTags: ["review-by-product"],
      keepUnusedDataFor: 600,
    }),
    saveReview: builder.mutation<IDBResponseDT<{reviewId: number}>, ISaveReview>({
        query: (body) => ({
            url: '/review/save-review',
            method: 'POST',
            body,
        }),
        invalidatesTags: ["review-by-product"],
    }),

  }),
});

export const {
    useGetReviewByProductIdQuery,
    useSaveReviewMutation
} = authApi;
