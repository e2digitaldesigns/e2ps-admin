import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Auth = {
  getAuth() {
    let loggedIn = false;

    try {
      jwtDecode(localStorage.getItem(process.env.REACT_APP_JWT_TOKEN));
      loggedIn = true;
    } catch (err) {
      console.error(err);
    }

    return loggedIn;
  },

  privateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          Auth.getAuth() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/logout',
              }}
            />
          )
        }
      />
    );
  },
};

export default Auth;
