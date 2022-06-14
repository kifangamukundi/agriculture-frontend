import { createSlice } from "@reduxjs/toolkit";

export const produceSlice = createSlice({
  name: "produce",
  initialState: {
    produces: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProduceStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProduceSuccess: (state, action) => {
      state.isFetching = false;
      state.produces = action.payload;
    },
    getProduceFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteProduceStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProduceSuccess: (state, action) => {
      state.isFetching = false;
      state.produces.splice(
        state.produces.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProduceFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateProduceStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProduceSuccess: (state, action) => {
      state.isFetching = false;
      state.produces[
        state.produces.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.produce;
    },
    updateProduceFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addProduceStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProduceSuccess: (state, action) => {
      state.isFetching = false;
      state.produces.push(action.payload);
    },
    addProduceFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProduceStart,
  getProduceSuccess,
  getProduceFailure,
  deleteProduceStart,
  deleteProduceSuccess,
  deleteProduceFailure,
  updateProduceStart,
  updateProduceSuccess,
  updateProduceFailure,
  addProduceStart,
  addProduceSuccess,
  addProduceFailure,
} = produceSlice.actions;

export default produceSlice.reducer;
