import { publicRequest, userRequest } from "../../requestMethods";

import {
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
  deleteCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  updateCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  addCategoryFailure,
  addCategoryStart,
  addCategorySuccess,
} from "../categoryRedux";


// for categories
export const getCategories = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await publicRequest.get("/category/all");
    dispatch(getCategorySuccess(res.data));
  } catch (err) {
    dispatch(getCategoryFailure());
  }
};

export const deleteCategory = async (id, dispatch) => {
  dispatch(deleteCategoryStart());
  try {
    const res = await userRequest.delete(`/category/${id}`);
    dispatch(deleteCategorySuccess(id));
  } catch (err) {
    dispatch(deleteCategoryFailure());
  }
};

export const updateCategory = async (id, category, dispatch) => {
  dispatch(updateCategoryStart());
  try {
    const res = await userRequest.patch(`/category/${id}`, category);
    dispatch(updateCategorySuccess({ id, category }));
  } catch (err) {
    dispatch(updateCategoryFailure());
  }
};
export const addCategory = async (category, dispatch) => {
  dispatch(addCategoryStart());
  try {
    const res = await userRequest.post(`/category`, category);
    dispatch(addCategorySuccess(res.data));
  } catch (err) {
    dispatch(addCategoryFailure());
  }
};