import { userRequest } from "../../requestMethods";

import {
  getCountyFailure,
  getCountyStart,
  getCountySuccess,
  deleteCountyFailure,
  deleteCountyStart,
  deleteCountySuccess,
  updateCountyFailure,
  updateCountyStart,
  updateCountySuccess,
  addCountyFailure,
  addCountyStart,
  addCountySuccess,
} from "../countyRedux";


export const getCounties = async (dispatch) => {
  dispatch(getCountyStart());
  try {
    const res = await userRequest.get("/county/all");
    dispatch(getCountySuccess(res.data));
  } catch (err) {
    dispatch(getCountyFailure());
  }
};

export const deleteCounty = async (id, dispatch) => {
  dispatch(deleteCountyStart());
  try {
    const res = await userRequest.delete(`/county/${id}`);
    dispatch(deleteCountySuccess(id));
  } catch (err) {
    dispatch(deleteCountyFailure());
  }
};

export const updateCounty = async (id, county, dispatch) => {
  dispatch(updateCountyStart());
  try {
    const res = await userRequest.patch(`/county/${id}`, county);
    dispatch(updateCountySuccess({ id, county }));
  } catch (err) {
    dispatch(updateCountyFailure());
  }
};
export const addCounty = async (county, dispatch) => {
  dispatch(addCountyStart());
  try {
    const res = await userRequest.post(`/county`, county);
    dispatch(addCountySuccess(res.data));
  } catch (err) {
    dispatch(addCountyFailure());
  }
};