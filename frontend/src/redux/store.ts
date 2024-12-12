import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import filterSlice from './feature/filterSlice';
import authSlice from './feature/authSlice';
import cartSlice from './feature/cartSlice';
import wishlistSlice from './feature/wishlistSlice';
import productSlice from './feature/productSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filter:filterSlice,
    auth:authSlice,
    cart:cartSlice,
    wishlist:wishlistSlice,
    product:productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch