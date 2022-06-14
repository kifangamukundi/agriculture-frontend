import { publicRequest, userRequest } from "../../requestMethods";
import { getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
    addProductFailure,
    addProductStart,
    addProductSuccess, } from "../productRedux";

    export const getProducts = async (dispatch) => {
        dispatch(getProductStart());
        try {
          const res = await publicRequest.get("/product/all");
          dispatch(getProductSuccess(res.data));
        } catch (err) {
          dispatch(getProductFailure());
        }
      };
      
      export const deleteProduct = async (id, dispatch) => {
        dispatch(deleteProductStart());
        try {
          const res = await userRequest.delete(`/product/${id}`);
          dispatch(deleteProductSuccess(id));
        } catch (err) {
          dispatch(deleteProductFailure());
        }
      };
      
      export const updateProduct = async (id, product, dispatch) => {
        dispatch(updateProductStart());
        try {
          // update
          const res = await userRequest.patch(`/product/${id}`, product);
          dispatch(updateProductSuccess({ id, product }));
        } catch (err) {
          dispatch(updateProductFailure());
        }
      };
      export const addProduct = async (product, dispatch) => {
        dispatch(addProductStart());
        try {
          const res = await userRequest.post(`/product`, product);
          dispatch(addProductSuccess(res.data));
        } catch (err) {
          dispatch(addProductFailure());
        }
      };