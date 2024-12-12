import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";
import { ICartType } from "@/types/cart-type";

type IWishlistState = {
  wishlists: ICartType[];
};
let initialWishlistState: IWishlistState = {
  wishlists: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialWishlistState,
  reducers: {
    add_to_wishlist: (state, { payload }: { payload: ICartType }) => {
      const isExist = state.wishlists.some(
        (item: ICartType) => item.id === payload.id
      );
      if (!isExist) {
        state.wishlists.push(payload);
        toast.success(`${payload.title} added to wishlist`);
      } else {
        state.wishlists = state.wishlists.filter(
          (item: ICartType) => item.id !== payload.id
        );
        toast.success(`${payload.title} removed from wishlist`);
      }
      localStorage.setItem("wishlist_items", JSON.stringify(state.wishlists));
    },
    remove_wishlist_product: (state, { payload }: { payload: ICartType }) => {
      state.wishlists = state.wishlists.filter(
        (item: ICartType) => item.id !== payload.id
      );
      localStorage.setItem("wishlist_items", JSON.stringify(state.wishlists));
      toast.error(`${payload.title} removed from wishlist`);
    },
    getWishlistProducts: (state) => {
      state.wishlists = JSON.parse(
        localStorage.getItem("wishlist_items") || "[]"
      );
    },
  },
});

export const {add_to_wishlist,remove_wishlist_product,getWishlistProducts} = wishlistSlice.actions;
export default wishlistSlice.reducer;
