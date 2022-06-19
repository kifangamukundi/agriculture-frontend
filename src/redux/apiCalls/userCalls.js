import { publicRequest, userRequest } from "../../requestMethods";
import { loginFailure, 
  loginStart, 
  loginSuccess, 
  signUpStart, 
  signUpSuccess,
  signUpFailure, 
  signOutStart, 
  signOutSuccess, 
  signOutFailure } from "../userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/signin", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  export const signUp = async (dispatch, user) => {
    dispatch(signUpStart());
    try {
      const res = await publicRequest.post("/auth/signup", user);
      dispatch(signUpSuccess(res.data));
    } catch (err) {
      dispatch(signUpFailure());
    }
  };
  export const signOut = async (dispatch, user) => {
    dispatch(signOutStart());
    try {
      const res = await localStorage.removeItem("user");
      dispatch(signOutSuccess(res.data));
    } catch (err) {
      dispatch(signOutFailure());
    }
  };