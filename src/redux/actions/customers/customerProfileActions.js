import http from '../../../utils/httpServices';
import * as actions from '../actionTypes';

export const fetchCustomerProfile = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_CUSTOMER_PROFILE_PENDING });
    try {
      const { data } = await http.get('customers/' + id, {});

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({ type: actions.FETCH_CUSTOMER_PROFILE_SUCCESS, payload: data });

      return data;
    } catch (error) {
      console.log(34, error);

      dispatch({
        type: actions.FETCH_CUSTOMER_PROFILE_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};

export const updateCustomerProfile = (formData) => {
  console.log(31, formData);
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_CUSTOMER_PROFILE_PENDING });
    try {
      const { data } = await http.put('customers/' + formData._id, {
        formData,
      });
      if (data.error.errorCode !== '0x0') {
        throw data;
      }
      dispatch({
        type: actions.UPDATE_CUSTOMER_PROFILE_SUCCESS,
        payload: { result: data.result, formData },
      });
      return data;
    } catch (error) {
      dispatch({
        type: actions.UPDATE_CUSTOMER_PROFILE_FAILURE,
        payload: error,
      });
      return error;
    }
  };
};
