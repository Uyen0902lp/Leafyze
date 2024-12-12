import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IFilterState {
  priceValue: number[];
}

const initialState: IFilterState = {
  priceValue: [],
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatePrice: (state, action: PayloadAction<number[]>) => {
      state.priceValue = action.payload;
    },
  },
})


export const { setStatePrice } = filterSlice.actions;
export default filterSlice.reducer;