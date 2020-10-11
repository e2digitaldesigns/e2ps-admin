import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { accountLoggedInRefresh } from './redux/actions/account/accountActions';
import { fetchSystemInformation } from './redux/actions/system/systemActions';

import Auth from './utils/authServices';
import Login from './components/application/login/login';
import Logout from './components/application/login/logout';
import passwordReset from './components/application/password-reset/password-reset';
import Console from './components/application/console/console';

const App = (props) => {
  console.log(20, process.env.REACT_APP_REST_API);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.account.loggedIn);
  const system = useSelector((state) => state.system);

  useEffect(() => {
    async function appMount() {
      try {
        const result = await dispatch(fetchSystemInformation());

        if (result.error.errorCode !== '0x0') {
          throw result;
        }
      } catch (err) {
        console.log('System Error', err);
      }
    }

    appMount();
  }, [dispatch]);

  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await jwtDecode(
          localStorage.getItem(process.env.REACT_APP_JWT_TOKEN),
        );
        await dispatch(accountLoggedInRefresh({ status: true, ...data }));
      } catch (error) {
        console.log('Login Error', error);
      }
    }

    checkStatus();
  }, [dispatch, loggedIn]);

  if (!system.systemLoaded) {
    return <div>System Not Loaded</div>;
  }

  return (
    <>
      <React.Fragment>
        <ToastContainer />
        <section>
          <BrowserRouter>
            <Switch>
              <Auth.privateRoute path="/console" component={Console} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />

              <Route
                exact
                path="/password-reset/:id"
                component={passwordReset}
              />

              <Redirect to="/login" />
            </Switch>
          </BrowserRouter>
        </section>
      </React.Fragment>
    </>
  );
};

export default App;
