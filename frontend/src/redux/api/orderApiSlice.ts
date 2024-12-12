import { ICartType } from "@/types/cart-type";
import { apiSlice } from "./apiSlice";
import { IDBResponseDT } from "@/types/db-response-dt";
import { ISaveOrderUserInfo, IUserOrdersRes, IOrderResponse, ISaveOrderResponse } from "@/types/order-d-t";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      IDBResponseDT<string>,
      { amount: number }
    >({
      query: (body) => ({
        url: "/order/create-payment-intent",
        method: "POST",
        body,
      }),
    }),

    //saveOrder
    saveOrder: builder.mutation<
      IDBResponseDT<ISaveOrderResponse['data']>,
      {
        amount: number;
        paymentIntentId: string;
        products: ICartType[];
        shipCost: number;
        status: string;
        userInfo: ISaveOrderUserInfo;
      }
    >({
      query: (body) => ({
        url: "/order/save-order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user-orders"],
    }),

    // getUserOrders
    getUserOrders: builder.query<IDBResponseDT<IUserOrdersRes>, void>({
      query: () => `/order/user-orders`,
      providesTags: ["user-orders"],
      keepUnusedDataFor: 600,
    }),

    //getAllOrder
    showAllOrders: builder.query<
      IDBResponseDT<{ orders: any[]; countAll: number }>,
      void
    >({
      query: () => `/order/show-all`,
      providesTags: ["user-orders"],
      keepUnusedDataFor: 600,
    }),

    //updateOrder
    updateOrder: builder.mutation<
      IDBResponseDT<{ success: boolean; message: string }>,
      { id: string | number; data: Partial<IOrderResponse> }
    >({
      query: ({ id, data }) => ({
        url: `/order/update-order/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user-orders"],
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useSaveOrderMutation, useGetUserOrdersQuery, useShowAllOrdersQuery, useUpdateOrderMutation, } = authApi;
