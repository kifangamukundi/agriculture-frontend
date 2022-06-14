import { publicRequest, userRequest } from "../../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "../userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/signin", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };