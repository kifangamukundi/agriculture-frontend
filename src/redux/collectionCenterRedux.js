import { createSlice } from "@reduxjs/toolkit";

export const CollectionCenterSlice = createSlice({
  name: "collectionCenter",
  initialState: {
    collectionCenters: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCollectionCenterStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCollectionCenterSuccess: (state, action) => {
      state.isFetching = false;
      state.collectionCenters = action.payload;
    },
    getCollectionCenterFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCollectionCenterStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCollectionCenterSuccess: (state, action) => {
      state.isFetching = false;
      state.collectionCenters.splice(
        state.collectionCenters.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCollectionCenterFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCollectionCenterStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCollectionCenterSuccess: (state, action) => {
      state.isFetching = false;
      state.collectionCenters[
        state.collectionCenters.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.collectionCenter;
    },
    updateCollectionCenterFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addCollectionCenterStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCollectionCenterSuccess: (state, action) => {
      state.isFetching = false;
      state.collectionCenters.push(action.payload);
    },
    addCollectionCenterFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCollectionCenterStart,
  getCollectionCenterSuccess,
  getCollectionCenterFailure,
  deleteCollectionCenterStart,
  deleteCollectionCenterSuccess,
  deleteCollectionCenterFailure,
  updateCollectionCenterStart,
  updateCollectionCenterSuccess,
  updateCollectionCenterFailure,
  addCollectionCenterStart,
  addCollectionCenterSuccess,
  addCollectionCenterFailure,
} = CollectionCenterSlice.actions;

export default CollectionCenterSlice.reducer;
