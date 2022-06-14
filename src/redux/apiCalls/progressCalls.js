import { userRequest } from "../../requestMethods";

import {
  getProgressFailure,
  getProgressStart,
  getProgressSuccess,
  deleteProgressFailure,
  deleteProgressStart,
  deleteProgressSuccess,
  updateProgressFailure,
  updateProgressStart,
  updateProgressSuccess,
  addProgressFailure,
  addProgressStart,
  addProgressSuccess,
} from "../progressRedux";


export const getProgresses = async (dispatch) => {
  dispatch(getProgressStart());
  try {
    const res = await userRequest.get("/progress/all");
    dispatch(getProgressSuccess(res.data));
  } catch (err) {
    dispatch(getProgressFailure());
  }
};

export const deleteProgress = async (id, dispatch) => {
  dispatch(deleteProgressStart());
  try {
    const res = await userRequest.delete(`/progress/${id}`);
    dispatch(deleteProgressSuccess(id));
  } catch (err) {
    dispatch(deleteProgressFailure());
  }
};

export const updateProgress = async (id, progress, dispatch) => {
  dispatch(updateProgressStart());
  try {
    const res = await userRequest.patch(`/progress`, progress);
    dispatch(updateProgressSuccess({ id, progress }));
  } catch (err) {
    dispatch(updateProgressFailure());
  }
};
export const addProgress = async (progress, dispatch) => {
  dispatch(addProgressStart());
  try {
    const res = await userRequest.post(`/progress`, progress);
    dispatch(addProgressSuccess(res.data));
  } catch (err) {
    dispatch(addProgressFailure());
  }
};