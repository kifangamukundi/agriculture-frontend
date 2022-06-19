import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    signUpStart: (state) => {
      state.isFetching = true;
    },
    signUpSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    signUpFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    signOutStart: (state) => {
      state.isFetching = true;
    },
    signOutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
    },
    signOutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginStart,
   loginSuccess, 
   loginFailure, 
   signUpStart, 
   signUpSuccess, 
   signUpFailure,
   signOutStart, 
   signOutSuccess, 
   signOutFailure,
   logout
} = userSlice.actions;
export default userSlice.reducer;
