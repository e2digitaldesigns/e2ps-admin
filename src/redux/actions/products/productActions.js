import http from "../../../utils/httpServices";
import * as actions from "../actionTypes";

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_PRODUCTS_PENDING });
    try {
      const { data } = await http.get("products/products/", {});
      if (data.error.errorCode !== "0x0") {
        throw data.error;
      }

      dispatch({ type: actions.FETCH_PRODUCTS_SUCCESS, payload: data });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.FETCH_PRODUCTS_FAILURE, payload: error });
    }
  };
};

export const fetchProductById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_PRODUCT_BY_ID_PENDING });
    try {
      const { data } = await http.get("products/products/" + id, {});
      if (data.error.errorCode !== "0x0") {
        throw data.error;
      }

      dispatch({ type: actions.FETCH_PRODUCT_BY_ID_SUCCESS, payload: data });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.FETCH_PRODUCT_BY_ID_FAILURE, payload: error });
    }
  };
};

export const updateProduct = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_PRODUCT_PENDING });
    try {
      const { data } = await http.put("products/products/" + formData._id, {
        formData,
      });
      if (data.error.errorCode !== "0x0") {
        throw data.error;
      }

      dispatch({ type: actions.UPDATE_PRODUCT_SUCCESS, payload: formData });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.UPDATE_PRODUCT_FAILURE, payload: error });
    }
  };
};

export const deleteProduct = (id) => {
  console.log(61, id);
  return async (dispatch) => {
    dispatch({ type: actions.DELETE_PRODUCT_PENDING });
    try {
      const { data } = await http.delete("products/products/" + id);
      if (data.error.errorCode !== "0x0") {
        throw data.error;
      }

      dispatch({ type: actions.DELETE_PRODUCT_SUCCESS, payload: id });
      return data;
    } catch (error) {
      console.log(74, error);
      dispatch({ type: actions.DELETE_PRODUCT_FAILURE, payload: error });
    }
  };
};

////////////////////////////////////////////////
//  PRODUCT SIZES  /////////////////////////////
////////////////////////////////////////////////
export const createProductSize = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.CREATE_PRODUCT_SIZE_PENDING });
    try {
      const { data } = await http.post("products/productSizes", { formData });
      if (data.error.errorCode !== "0x0") {
        throw data.error;
      }

      dispatch({
        type: actions.CREATE_PRODUCT_SIZE_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.CREATE_PRODUCT_SIZE_FAILURE, payload: error });
    }
  };
};

export const updateProductSize = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_PRODUCT_SIZE_PENDING });
    try {
      const { data } = await http.put("products/productSizes/" + formData._id, {
        formData,
      });
      if (data.error.errorCode !== "0x0") {
        throw data.error;
      }

      dispatch({
        type: actions.UPDATE_PRODUCT_SIZE_SUCCESS,
        payload: formData,
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.UPDATE_PRODUCT_SIZE_FAILURE, payload: error });
    }
  };
};

export const deleteProductSize = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.DELETE_PRODUCT_SIZE_PENDING });
    try {
      const { data } = await http.delete("products/productSizes/" + id);
      if (data.error.errorCode !== "0x0") {
        throw data.error;
      }

      dispatch({
        type: actions.DELETE_PRODUCT_SIZE_SUCCESS,
        payload: id,
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.DELETE_PRODUCT_SIZE_FAILURE, payload: error });
    }
  };
};

////////////////////////////////////////////////
//  PRODUCT QUANTITIES  ////////////////////////
////////////////////////////////////////////////
export const createProductQuantity = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.CREATE_PRODUCT_QUANTITY_PENDING });
    try {
      const { data } = await http.post("products/productQuantities", {
        formData,
      });
      if (data.error.errorCode !== "0x0") {
        throw data.error;
      }

      dispatch({
        type: actions.CREATE_PRODUCT_QUANTITY_SUCCESS,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({
        type: actions.CREATE_PRODUCT_QUANTITY_FAILURE,
        payload: error,
      });
    }
  };
};

export const updateProductQuantity = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_PRODUCT_QUANTITY_PENDING });
    try {
      const { data } = await http.put(
        "products/productQuantities/" + formData._id,
        {
          formData,
        }
      );
      if (data.error.errorCode !== "0x0") {
        throw data.error;
      }

      dispatch({
        type: actions.UPDATE_PRODUCT_QUANTITY_SUCCESS,
        payload: formData,
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({
        type: actions.UPDATE_PRODUCT_QUANTITY_FAILURE,
        payload: error,
      });
    }
  };
};

export const deleteProductQuantity = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.DELETE_PRODUCT_QUANTITY_PENDING });
    try {
      const { data } = await http.delete("products/productQuantities/" + id);
      if (data.error.errorCode !== "0x0") {
        throw data.error;
      }

      dispatch({
        type: actions.DELETE_PRODUCT_QUANTITY_SUCCESS,
        payload: id,
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({
        type: actions.DELETE_PRODUCT_QUANTITY_FAILURE,
        payload: error,
      });
    }
  };
};
