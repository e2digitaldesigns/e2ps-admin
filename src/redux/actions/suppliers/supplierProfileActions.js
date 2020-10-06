import http from '../../../utils/httpServices';
import * as actions from '../actionTypes';

export const fetchSupplierProfile = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_SUPPLIER_PROFILE_PENDING });
    try {
      const { data } = await http.get('suppliers/' + id, {});

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({ type: actions.FETCH_SUPPLIER_PROFILE_SUCCESS, payload: data });

      return data;
    } catch (error) {
      console.log(34, error);

      dispatch({
        type: actions.FETCH_SUPPLIER_PROFILE_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};

export const updateSupplierProfile = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_SUPPLIER_PROFILE_PENDING });
    try {
      const { data } = await http.put('suppliers/' + formData._id, {
        formData,
      });

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({
        type: actions.UPDATE_SUPPLIER_PROFILE_SUCCESS,
        payload: { result: data.result, formData },
      });

      return data;
    } catch (error) {
      dispatch({
        type: actions.UPDATE_SUPPLIER_PROFILE_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};
