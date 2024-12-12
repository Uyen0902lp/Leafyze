import { IBrand } from '@/types/brand-type';
import { apiSlice } from './apiSlice';
import { IDBResponseDT } from '@/types/db-response-dt';

export const brandApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Get all brands
    getAllBrands: builder.query<IDBResponseDT<IBrand[]>, void>({
      query: () => `/brand/show-all`,
      providesTags: ['all-brand'],
      keepUnusedDataFor: 600,
    }),

    // Add a brand
    addBrand: builder.mutation<IDBResponseDT<IBrand>, Partial<IBrand>>({
      query(data: Partial<IBrand>) {
        return {
          url: `/brand/add`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['all-brand'],
    }),
  }),
});

export const { useGetAllBrandsQuery, useAddBrandMutation } = brandApi;
