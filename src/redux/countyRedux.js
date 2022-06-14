import { createSlice } from "@reduxjs/toolkit";

export const countySlice = createSlice({
  name: "county",
  initialState: {
    counties: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCountyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCountySuccess: (state, action) => {
      state.isFetching = false;
      state.counties = action.payload;
    },
    getCountyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCountyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCountySuccess: (state, action) => {
      state.isFetching = false;
      state.counties.splice(
        state.counties.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCountyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCountyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCountySuccess: (state, action) => {
      state.isFetching = false;
      state.counties[
        state.counties.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.county;
    },
    updateCountyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addCountyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCountySuccess: (state, action) => {
      state.isFetching = false;
      state.counties.push(action.payload);
    },
    addCountyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCountyStart,
  getCountySuccess,
  getCountyFailure,
  deleteCountyStart,
  deleteCountySuccess,
  deleteCountyFailure,
  updateCountyStart,
  updateCountySuccess,
  updateCountyFailure,
  addCountyStart,
  addCountySuccess,
  addCountyFailure,
} = countySlice.actions;

export default countySlice.reducer;
