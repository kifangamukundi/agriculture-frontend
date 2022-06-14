import { createSlice } from "@reduxjs/toolkit";

export const progressSlice = createSlice({
  name: "progress",
  initialState: {
    progresses: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProgressStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProgressSuccess: (state, action) => {
      state.isFetching = false;
      state.progresses = action.payload;
    },
    getProgressFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteProgressStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProgressSuccess: (state, action) => {
      state.isFetching = false;
      state.progresses.splice(
        state.progresses.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProgressFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateProgressStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProgressSuccess: (state, action) => {
      state.isFetching = false;
      state.progresses[
        state.progresses.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.progress;
    },
    updateProgressFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addProgressStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProgressSuccess: (state, action) => {
      state.isFetching = false;
      state.progresses.push(action.payload);
    },
    addProgressFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProgressStart,
  getProgressSuccess,
  getProgressFailure,
  deleteProgressStart,
  deleteProgressSuccess,
  deleteProgressFailure,
  updateProgressStart,
  updateProgressSuccess,
  updateProgressFailure,
  addProgressStart,
  addProgressSuccess,
  addProgressFailure,
} = progressSlice.actions;

export default progressSlice.reducer;
