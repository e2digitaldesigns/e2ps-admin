import http from './../../../utils/httpServices';

export const accountLogin = (payload) => {
  return async (dispatch) => {
    dispatch(accountLoginPending());
    try {
      const { data } = await http.post('auth', { ...payload });

      if (data.error.errorCode !== '0x0') {
        throw data;
      }

      await localStorage.setItem(process.env.REACT_APP_JWT_TOKEN, data.token);

      dispatch(accountLoginSuccess(data));

      return data;
    } catch (error) {
      dispatch(accountLoginFailure(error));
      return error;
    }
  };
};

const accountLoginPending = () => {
  return { type: 'ACCOUNT_LOGIN_PENDING' };
};

const accountLoginSuccess = (data) => {
  return { type: 'ACCOUNT_LOGIN_SUCCESS', payload: data };
};

const accountLoginFailure = (data) => {
  return { type: 'ACCOUNT_LOGIN_FAILURE', payload: data };
};

export const accountLoggedInRefresh = (payload) => {
  return async (dispatch) => {
    try {
      if (payload.status === true) {
        dispatch({ type: 'ACCOUNT_LOGGED_IN_REFRESH_TRUE', payload });
      } else {
        dispatch({ type: 'ACCOUNT_LOGGED_IN_REFRESH_FALSE', payload });
      }
    } catch (err) {
      console.log(41, err);
    }
  };
};

export const accountLogout = () => {
  return async (dispatch) => {
    try {
      await localStorage.removeItem(process.env.REACT_APP_JWT_TOKEN);
      dispatch({ type: 'ACCOUNT_LOGOUT' });
    } catch (err) {
      console.log(52, err);
    }
  };
};
