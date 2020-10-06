import http from '../../../utils/httpServices';
import * as actions from './../../actions/actionTypes';

export const fetchSuppliers = () => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_SUPPLIERS_PENDING });
    try {
      const { data } = await http.get('suppliers');

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({ type: actions.FETCH_SUPPLIERS_SUCCESS, payload: data });

      return data;
    } catch (error) {
      console.log(18, error);

      dispatch({
        type: actions.FETCH_SUPPLIERS_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};
