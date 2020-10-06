import http from '../../../utils/httpServices';
import * as actions from './../../actions/actionTypes';

export const fetchStaff = () => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_STAFF_PENDING });
    try {
      const { data } = await http.get('staffers');

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({ type: actions.FETCH_STAFF_SUCCESS, payload: data });

      return data;
    } catch (error) {
      console.log(18, error);

      dispatch({
        type: actions.FETCH_STAFF_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};
