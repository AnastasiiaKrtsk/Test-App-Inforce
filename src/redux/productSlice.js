import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  search: '',
  page: 1,
};

const productsslice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    successAction: (state, { payload }) => {
      if (state.page > 1) {
        state.products.push(...payload);
      } else {
        state.products = payload;
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

export const productsReducer = productsslice.reducer;
export const { successAction, moreAction, searchAction } =
  productsslice.actions;
