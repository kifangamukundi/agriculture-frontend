import { publicRequest, userRequest } from "../../requestMethods";
import { loginFailure, 
  loginStart, 
  loginSuccess, 
  signUpStart, 
  signUpSuccess,
  signUpFailure, 
  logOutStart, } from "../userRedux";

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

  export const logout = async (dispatch) => {
    console.log("I was called")
    dispatch(logOutStart());
    // try {
    //   const res = await publicRequest.post("/auth/signin", user);
    //   dispatch(loginSuccess(res.data));
    // } catch (err) {
    //   dispatch(loginFailure());
    // }
  };