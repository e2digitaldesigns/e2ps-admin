import http from '../../../utils/httpServices';
import * as actions from './../../actions/actionTypes';

export const fetchCustomers = (formObj) => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_CUSTOMERS_PENDING });
    try {
      const { data } = await http.get(
        `customers?page=${formObj.currentPage}&results=${formObj.pageSize}&filter=${formObj.filter}&domain=${formObj.domain}`,
      );

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch({ type: actions.FETCH_CUSTOMERS_SUCCESS, payload: data });

      return data;
    } catch (error) {
      console.log(18, error);

      dispatch({
        type: actions.FETCH_CUSTOMERS_FAILURE,
        payload: error,
      });

      return error;
    }
  };
};
