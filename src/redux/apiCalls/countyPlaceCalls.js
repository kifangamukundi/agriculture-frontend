import { userRequest } from "../../requestMethods";

import {
  getCountyPlaceFailure,
  getCountyPlaceStart,
  getCountyPlaceSuccess,
  deleteCountyPlaceFailure,
  deleteCountyPlaceStart,
  deleteCountyPlaceSuccess,
  updateCountyPlaceFailure,
  updateCountyPlaceStart,
  updateCountyPlaceSuccess,
  addCountyPlaceFailure,
  addCountyPlaceStart,
  addCountyPlaceSuccess,
} from "../countyPlaceRedux";


export const getCountyPlaces = async (dispatch) => {
  dispatch(getCountyPlaceStart());
  try {
    const res = await userRequest.get("/CountyPlace/all");
    dispatch(getCountyPlaceSuccess(res.data));
  } catch (err) {
    dispatch(getCountyPlaceFailure());
  }
};

export const deleteCountyPlace = async (id, dispatch) => {
  dispatch(deleteCountyPlaceStart());
  try {
    const res = await userRequest.delete(`/countyPlace/${id}`);
    dispatch(deleteCountyPlaceSuccess(id));
  } catch (err) {
    dispatch(deleteCountyPlaceFailure());
  }
};

export const updateCountyPlace = async (id, countyPlace, dispatch) => {
  dispatch(updateCountyPlaceStart());
  try {
    const res = await userRequest.patch(`/countyPlace/${id}`, countyPlace);
    dispatch(updateCountyPlaceSuccess({ id, countyPlace }));
  } catch (err) {
    dispatch(updateCountyPlaceFailure());
  }
};
export const addCountyPlace = async (countyPlace, dispatch) => {
  dispatch(addCountyPlaceStart());
  try {
    const res = await userRequest.post(`/countyPlace`, countyPlace);
    dispatch(addCountyPlaceSuccess(res.data));
  } catch (err) {
    dispatch(addCountyPlaceFailure());
  }
};