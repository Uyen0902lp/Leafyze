import { apiSlice } from "./apiSlice";
import { IDBResponseDT } from "@/types/db-response-dt";
import { IProduct } from "@/types/product-d-t";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Add a new product
    createProduct: builder.mutation<IDBResponseDT<IProduct>, Partial<IProduct>>({
      query: (data) => {
        const token = localStorage.getItem('authToken');
        return {
          url: `/product/add`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        };
      },
      invalidatesTags: ['all-products'],
    }),

    // Get all products with optional filtering (categoryId, limit, page)
    getAllProducts: builder.query<
      IDBResponseDT<{ products: IProduct[]; totalCount: number }>,
      { categoryId?: number | null; limit?: number | null; page?: number | null }
    >({
      query: ({ categoryId = null, limit = null, page = null }) => {
        const params = new URLSearchParams();

        if (categoryId !== null) params.append("parentCategory", categoryId.toString());
        if (limit !== null) params.append("limit", limit.toString());
        if (page !== null) params.append("page", page.toString());

        return `/product/show-all${params.toString() ? `?${params.toString()}` : ""}`;
      },
      providesTags: ["all-products"],
    }),

    // Get products by price range
    getProductsByPriceRange: builder.query<IDBResponseDT<IProduct[]>, { minPrice: number; maxPrice: number }>({
      query: ({ minPrice, maxPrice }) => `/product/price-range-products?minPrice=${minPrice}&maxPrice=${maxPrice}`,
      providesTags: ["all-products"],
      keepUnusedDataFor: 600,
    }),

    // Get max price
    getMaxPrice: builder.query<IDBResponseDT<{ max_price: number }>, void>({
      query: () => `/product/max-price`,
      providesTags: ["all-products"],
      keepUnusedDataFor: 600,
    }),

    // Get products by category
    getProductsByCategory: builder.query<IDBResponseDT<IProduct[]>, { categoryId: number }>({
      query: ({ categoryId }) => `/product/category-products?categoryId=${categoryId}`,
      providesTags: ["all-products"],
      keepUnusedDataFor: 600,
    }),

    // Get products by brand
    getProductsByBrand: builder.query<IDBResponseDT<IProduct[]>, { brandId: number }>({
      query: ({ brandId }) => `/product/brand-products?brandId=${brandId}`,
      providesTags: ["all-products"],
      keepUnusedDataFor: 600,
    }),

    // Search products
    getSearchProducts: builder.query<IDBResponseDT<IProduct[]>, { searchText: string }>({
      query: ({ searchText }) => `/product/search-products?searchText=${encodeURIComponent(searchText)}`,
      providesTags: ["all-products"],
      keepUnusedDataFor: 600,
    }),

    //Update product
    updateProduct: builder.mutation<IDBResponseDT<IProduct>, { id: number; product: Partial<IProduct> }>({
      query: ({ id, product }) => {
        const token = localStorage.getItem("authToken");
        return {
          url: `product/update-product/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: product,
        };
      },
      invalidatesTags: ["all-products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductsByPriceRangeQuery,
  useGetMaxPriceQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByBrandQuery,
  useGetSearchProductsQuery,
  useUpdateProductMutation,
} = productApi;
