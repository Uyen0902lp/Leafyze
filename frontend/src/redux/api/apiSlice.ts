import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    prepareHeaders: (headers) => {
      try {
        const authToken = Cookies.get("authToken") || localStorage.getItem("authToken");

        if (authToken) {
          headers.set("Authorization", `Bearer ${authToken}`);
        }
      } catch (error) {
        console.error("Error setting auth token in headers:", error);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
  tagTypes: ['all-category','all-products','all-coupons','review-by-product','user-orders', 'prediction', 'disease', 'all-brand'],
});
