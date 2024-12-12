import { ICategoryDT } from '@/types/category-d-t';
import { apiSlice } from "./apiSlice";
import { IDBResponseDT } from '@/types/db-response-dt';

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all categories
    getAllCategories: builder.query<IDBResponseDT<ICategoryDT[]>, void>({
      query: () => `/category/show-all`,
      providesTags: ["all-category"],
      keepUnusedDataFor: 600,
    }),

    // add category
    addCategory: builder.mutation<IDBResponseDT<ICategoryDT>, ICategoryDT>({
      query(data: ICategoryDT) {
        return {
          url: `/category/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["all-category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
} = authApi;
