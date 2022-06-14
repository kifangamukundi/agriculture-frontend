import { userRequest } from "../../requestMethods";

import {
  getCollectionCenterFailure,
  getCollectionCenterStart,
  getCollectionCenterSuccess,
  deleteCollectionCenterFailure,
  deleteCollectionCenterStart,
  deleteCollectionCenterSuccess,
  updateCollectionCenterFailure,
  updateCollectionCenterStart,
  updateCollectionCenterSuccess,
  addCollectionCenterFailure,
  addCollectionCenterStart,
  addCollectionCenterSuccess,
} from "../collectionCenterRedux";


export const getCollectionCenters = async (dispatch) => {
  dispatch(getCollectionCenterStart());
  try {
    const res = await userRequest.get("/collectionCenter/all");
    dispatch(getCollectionCenterSuccess(res.data));
  } catch (err) {
    dispatch(getCollectionCenterFailure());
  }
};

export const deleteCollectionCenter = async (id, dispatch) => {
  dispatch(deleteCollectionCenterStart());
  try {
    const res = await userRequest.delete(`/collectionCenter/${id}`);
    dispatch(deleteCollectionCenterSuccess(id));
  } catch (err) {
    dispatch(deleteCollectionCenterFailure());
  }
};

export const updateCollectionCenter = async (id, collectionCenter, dispatch) => {
  dispatch(updateCollectionCenterStart());
  try {
    const res = await userRequest.patch(`/collectionCenter`, collectionCenter);
    dispatch(updateCollectionCenterSuccess({ id, collectionCenter }));
  } catch (err) {
    dispatch(updateCollectionCenterFailure());
  }
};
export const addCollectionCenter = async (collectionCenter, dispatch) => {
  dispatch(addCollectionCenterStart());
  try {
    const res = await userRequest.post(`/collectionCenter`, collectionCenter);
    dispatch(addCollectionCenterSuccess(res.data));
  } catch (err) {
    dispatch(addCollectionCenterFailure());
  }
};