import http from '../../../utils/httpServices';
import * as actions from '../actionTypes';

export const getAttributes = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_ATTRIBUTES_PENDING });
    try {
      const { data } = await http.get('products/productAttributes/');
      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      dispatch({ type: actions.GET_ATTRIBUTES_SUCCESS, payload: data });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.GET_ATTRIBUTES_FAILURE, payload: error });
    }
  };
};

export const getAttributesById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_ATTRIBUTES_BY_ID_PENDING });
    try {
      const { data } = await http.get('products/productAttributes/' + id);
      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      dispatch({ type: actions.GET_ATTRIBUTES_BY_ID_SUCCESS, payload: data });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.GET_ATTRIBUTES_BY_ID_FAILURE, payload: error });
    }
  };
};

export const updateAttributes = (formData) => {
  console.log(41, formData);

  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_ATTRIBUTES_PENDING });

    try {
      const { data } = await http.put(
        'products/productAttributes/' + formData._id,
        { formData },
      );
      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      dispatch({ type: actions.UPDATE_ATTRIBUTES_SUCCESS, payload: formData });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.UPDATE_ATTRIBUTES_FAILURE, payload: error });
    }
  };
};

export const deleteAttributes = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.DELETE_ATTRIBUTES_PENDING });
    try {
      const { data } = await http.delete('products/productAttributes/' + id);
      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      dispatch({ type: actions.DELETE_ATTRIBUTES_SUCCESS, payload: data });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.DELETE_ATTRIBUTES_FAILURE, payload: error });
    }
  };
};
