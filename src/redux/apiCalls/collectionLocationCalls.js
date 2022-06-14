import { userRequest } from "../../requestMethods";

import {
  getCollectionLocationFailure,
  getCollectionLocationStart,
  getCollectionLocationSuccess,
  deleteCollectionLocationFailure,
  deleteCollectionLocationStart,
  deleteCollectionLocationSuccess,
  updateCollectionLocationFailure,
  updateCollectionLocationStart,
  updateCollectionLocationSuccess,
  addCollectionLocationFailure,
  addCollectionLocationStart,
  addCollectionLocationSuccess,
} from "../collectionLocationRedux";


export const getCollectionLocations = async (dispatch) => {
  dispatch(getCollectionLocationStart());
  try {
    const res = await userRequest.get("/collectionLocation/all");
    dispatch(getCollectionLocationSuccess(res.data));
  } catch (err) {
    dispatch(getCollectionLocationFailure());
  }
};

export const deleteCollectionLocation = async (id, dispatch) => {
  dispatch(deleteCollectionLocationStart());
  try {
    const res = await userRequest.delete(`/collectionLocation/${id}`);
    dispatch(deleteCollectionLocationSuccess(id));
  } catch (err) {
    dispatch(deleteCollectionLocationFailure());
  }
};

export const updateCollectionLocation = async (id, collectionLocation, dispatch) => {
  dispatch(updateCollectionLocationStart());
  try {
    const res = await userRequest.patch(`/collectionLocation`, collectionLocation);
    dispatch(updateCollectionLocationSuccess({ id, collectionLocation }));
  } catch (err) {
    dispatch(updateCollectionLocationFailure());
  }
};
export const addCollectionLocation = async (collectionLocation, dispatch) => {
  dispatch(addCollectionLocationStart());
  try {
    const res = await userRequest.post(`/collectionLocation`, collectionLocation);
    dispatch(addCollectionLocationSuccess(res.data));
  } catch (err) {
    dispatch(addCollectionLocationFailure());
  }
};