import http from './../../../utils/httpServices';
import * as actions from './../../actions/actionTypes';

export const fetchSystemInformation = () => {
  return async (dispatch) => {
    dispatch(fetchSystemInformationPending());
    try {
      const { data } = await http.get('system', {});

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      dispatch(fetchSystemInformationSuccess(data));

      return data;
    } catch (error) {
      dispatch(fetchSystemInformationFailure(error));
      return error;
    }
  };
};

const fetchSystemInformationPending = () => {
  return { type: actions.GET_SYSTEM_INFORMATION_PENDING };
};

const fetchSystemInformationSuccess = (data) => {
  return { type: actions.GET_SYSTEM_INFORMATION_SUCCESS, payload: data };
};

const fetchSystemInformationFailure = (data) => {
  return { type: actions.GET_SYSTEM_INFORMATION_FAILURE, payload: data };
};
