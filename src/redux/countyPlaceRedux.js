import { createSlice } from "@reduxjs/toolkit";

export const countyPlaceSlice = createSlice({
  name: "countyPlace",
  initialState: {
    counties: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCountyPlaceStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCountyPlaceSuccess: (state, action) => {
      state.isFetching = false;
      state.counties = action.payload;
    },
    getCountyPlaceFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCountyPlaceStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCountyPlaceSuccess: (state, action) => {
      state.isFetching = false;
      state.counties.splice(
        state.counties.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCountyPlaceFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCountyPlaceStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCountyPlaceSuccess: (state, action) => {
      state.isFetching = false;
      state.countyPlaces[
        state.countyPlaces.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.county;
    },
    updateCountyPlaceFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addCountyPlaceStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCountyPlaceSuccess: (state, action) => {
      state.isFetching = false;
      state.countyPlaces.push(action.payload);
    },
    addCountyPlaceFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCountyPlaceStart,
  getCountyPlaceSuccess,
  getCountyPlaceFailure,
  deleteCountyPlaceStart,
  deleteCountyPlaceSuccess,
  deleteCountyPlaceFailure,
  updateCountyPlaceStart,
  updateCountyPlaceSuccess,
  updateCountyPlaceFailure,
  addCountyPlaceStart,
  addCountyPlaceSuccess,
  addCountyPlaceFailure,
} = countyPlaceSlice.actions;

export default countyPlaceSlice.reducer;
