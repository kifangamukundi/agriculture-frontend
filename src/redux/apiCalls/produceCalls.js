import { userRequest } from "../../requestMethods";

import {
  getProduceFailure,
  getProduceStart,
  getProduceSuccess,
  deleteProduceFailure,
  deleteProduceStart,
  deleteProduceSuccess,
  updateProduceFailure,
  updateProduceStart,
  updateProduceSuccess,
  addProduceFailure,
  addProduceStart,
  addProduceSuccess,
} from "../produceRedux";


// for categories
export const getProduces = async (dispatch) => {
  dispatch(getProduceStart());
  try {
    const res = await userRequest.get("/produce/all");
    dispatch(getProduceSuccess(res.data));
  } catch (err) {
    dispatch(getProduceFailure());
  }
};

export const deleteProduce = async (id, dispatch) => {
  dispatch(deleteProduceStart());
  try {
    const res = await userRequest.delete(`/produce/${id}`);
    dispatch(deleteProduceSuccess(id));
  } catch (err) {
    dispatch(deleteProduceFailure());
  }
};

export const updateProduce = async (id, produce, dispatch) => {
  dispatch(updateProduceStart());
  try {
    const res = await userRequest.patch(`/produce/${id}`, produce);
    dispatch(updateProduceSuccess({ id, produce }));
  } catch (err) {
    dispatch(updateProduceFailure());
  }
};
export const addProduce = async (produce, dispatch) => {
  dispatch(addProduceStart());
  try {
    const res = await userRequest.post(`/produce`, produce);
    dispatch(addProduceSuccess(res.data));
  } catch (err) {
    dispatch(addProduceFailure());
  }
};