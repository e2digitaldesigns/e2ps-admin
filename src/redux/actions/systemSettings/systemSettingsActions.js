import http from './../../../utils/httpServices';
import * as actions from './../../actions/actionTypes';

export const fetchSystemSettings = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_SYSTEM_SETTINGS_PENDING });
    try {
      const { data } = await http.get('systemSettings');

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({
        type: actions.GET_SYSTEM_SETTINGS_SUCCESS,
        payload: data.result,
      });
      return data;
    } catch (error) {
      console.log(16, error);
      dispatch({ type: actions.GET_SYSTEM_SETTINGS_FAILURE, payload: error });
      return error;
    }
  };
};

export const updateSystemSettings = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_SYSTEM_SETTINGS_PENDING });
    try {
      const { data } = await http.put('systemSettings', { formData });

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({
        type: actions.UPDATE_SYSTEM_SETTINGS_SUCCESS,
        payload: { result: data.result, formData },
      });

      return data;
    } catch (error) {
      dispatch({
        type: actions.UPDATE_SYSTEM_SETTINGS_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};
