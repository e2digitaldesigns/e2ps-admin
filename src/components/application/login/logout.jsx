import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { accountLogout } from './../../../redux/actions/account/accountActions';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function logOut() {
      await dispatch(accountLogout());
      localStorage.removeItem(process.env.REACT_APP_JWT_TOKEN);
      history.push('/home');
    }

    logOut();
  }, [dispatch, history]);

  try {
  } catch (error) {}

  return <div />;
};

export default Logout;
