import { IProduct } from "@/types/product-d-t";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IProductState = {
  showModal: boolean;
  modalProduct:IProduct | null;
};
let initialWishlistState: IProductState = {
  showModal: false,
  modalProduct: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialWishlistState,
  reducers: {
    setModalProduct: (state,action: PayloadAction<IProduct>) => {
      state.modalProduct = action.payload;
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalProduct = null;
    },
  },
});

export const {setModalProduct,closeModal} = productSlice.actions;
export default productSlice.reducer;
