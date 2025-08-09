import type { ProductParams } from "@/app/models/ProductParams";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductParams = {
  pageNumber: 1,
  pageSize: 8,
  types: [],
  brands: [],
  searchTerm: "",
  orderBy: "name",
};

export const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState,
  // Updating synchronous state in the store
  reducers: {
    setPageNumber(state, action) {
      state.pageNumber = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setOrderBy(state, action) {
      state.orderBy = action.payload;
      // When we do change the ordering, reset back to
      // page number 1
      state.pageNumber = 1;
    },
    setTypes(state, action) {
      state.types = action.payload;
      state.pageNumber = 1;
    },
    setBrands(state, action) {
      state.brands = action.payload;
      state.pageNumber = 1;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.pageNumber = 1;
    },
    resetParams() {
      return initialState;
    },
  },
});

export const {
  setBrands,
  setOrderBy,
  setPageNumber,
  setPageSize,
  setSearchTerm,
  setTypes,
  resetParams,
} = catalogSlice.actions;
