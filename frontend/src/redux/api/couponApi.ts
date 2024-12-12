import { apiSlice } from "./apiSlice";
import { IDBResponseDT } from '@/types/db-response-dt';
import { ICoupon } from '@/types/coupon-type';

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all coupons
    getAllCoupons: builder.query<IDBResponseDT<ICoupon[]>, void>({
      query: () => `/coupon/show-all`,
      providesTags: ["all-coupons"],
      keepUnusedDataFor: 600,
    }),

  }),
});

export const {
  useGetAllCouponsQuery,
} = authApi;
