import { createSlice } from "@reduxjs/toolkit";

export const CollectionLocationSlice = createSlice({
  name: "collectionLocation",
  initialState: {
    collectionLocations: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCollectionLocationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCollectionLocationSuccess: (state, action) => {
      state.isFetching = false;
      state.collectionLocations = action.payload;
    },
    getCollectionLocationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCollectionLocationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCollectionLocationSuccess: (state, action) => {
      state.isFetching = false;
      state.collectionLocations.splice(
        state.collectionLocations.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCollectionLocationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCollectionLocationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCollectionLocationSuccess: (state, action) => {
      state.isFetching = false;
      state.collectionLocations[
        state.collectionLocations.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.collectionLocation;
    },
    updateCollectionLocationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addCollectionLocationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCollectionLocationSuccess: (state, action) => {
      state.isFetching = false;
      state.collectionLocations.push(action.payload);
    },
    addCollectionLocationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCollectionLocationStart,
  getCollectionLocationSuccess,
  getCollectionLocationFailure,
  deleteCollectionLocationStart,
  deleteCollectionLocationSuccess,
  deleteCollectionLocationFailure,
  updateCollectionLocationStart,
  updateCollectionLocationSuccess,
  updateCollectionLocationFailure,
  addCollectionLocationStart,
  addCollectionLocationSuccess,
  addCollectionLocationFailure,
} = CollectionLocationSlice.actions;

export default CollectionLocationSlice.reducer;
