import http from '../../../utils/httpServices';
import * as actions from '../actionTypes';

export const fetchProfile = () => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_PROFILE_PENDING });
    try {
      const { data } = await http.get('adminProfile');

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      console.log(data);

      dispatch({ type: actions.FETCH_PROFILE_SUCCESS, payload: data });

      return data;
    } catch (error) {
      console.error(20, error);

      dispatch({
        type: actions.FETCH_PROFILE_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};

export const updateProfile = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_PROFILE_PENDING });
    try {
      const { data } = await http.put('adminProfile', { formData });

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      console.log(data);

      dispatch({ type: actions.UPDATE_PROFILE_SUCCESS, payload: data });

      return data;
    } catch (error) {
      console.error(48, error);

      dispatch({
        type: actions.UPDATE_PROFILE_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};
