import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  search: '',
  page: 1,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    successAction: (state, action) => {
      if (state.page > 1) {
        state.products.push(...action.payload);
      } else {
        state.products = action.payload;
      }
    },
    moreAction: (state) => {
      state.page += 1;
    },
    searchAction: (state, action) => {
      state.search = action.payload;
      state.page = 1;
      state.products = [];
    },
  },
});

export const { successAction, moreAction, searchAction } = productSlice.actions;
export const productsReducer = productSlice.reducer;
