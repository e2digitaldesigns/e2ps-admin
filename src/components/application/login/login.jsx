import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import http from '../../../utils/httpServices';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { accountLogin } from './../../../redux/actions/account/accountActions';

export default (props) => {
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);
  const account = useSelector((state) => state.account);
  const [state, setState] = useState({
    emailAddress: '',
    password: '',
  });

  const [loginState, SetLoginState] = useState({ errorMessage: null });

  const [resetState, setResetState] = useState({
    isActive: false,
    emailAddress: '',
  });

  const onChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      accountLogin({
        emailAddress: state.emailAddress,
        password: state.password,
        storeOwnerId: system.storeOwnerId,
      }),
    );

    if (result.error.errorCode !== '0x0') {
      SetLoginState({ ...loginState, errorMessage: result.error.errorDesc });
    }
  };

  const forgotPasswordToggle = (e) => {
    e.preventDefault();
    setResetState({ ...resetState, isActive: !resetState.isActive });
  };

  const forgotPasswordOnChange = (e) => {
    e.preventDefault();
    setResetState({ ...resetState, [e.target.name]: e.target.value });
  };

  const forgotPasswordOnSubmit = (e) => {
    e.preventDefault();

    http.post('/passwordReset', {
      type: 'admin',
      storeOwnerId: system.storeOwnerId,
      email: resetState.emailAddress,
    });
  };

  if (account.loggedIn) {
    return <Redirect to="/console" />;
  }

  return (
    <>
      <div className="login-form-holder">
        {!resetState.isActive && (
          <Form>
            <h5>E2PS Login</h5>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="emailAddress"
                placeholder="Enter email"
                value={state.emailAddress}
                onChange={(e) => onChange(e)}
                size="sm"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={state.password}
                onChange={(e) => onChange(e)}
                size="sm"
              />
            </Form.Group>

            {loginState.errorMessage && (
              <Form.Group>
                <Alert variant="danger" size="sm">
                  {loginState.errorMessage}
                </Alert>
              </Form.Group>
            )}

            <Button
              variant="primary"
              type="submit"
              size="sm"
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </Button>

            <Form.Group className="my-2">
              <a href="/#" onClick={(e) => forgotPasswordToggle(e)}>
                Forgot Password?
              </a>
            </Form.Group>
          </Form>
        )}

        {resetState.isActive && (
          <Form onSubmit={(e) => forgotPasswordOnSubmit(e)}>
            <h5>Reset Password!</h5>
            <>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="emailAddress"
                  placeholder="Enter email"
                  value={resetState.emailAddress}
                  onChange={(e) => forgotPasswordOnChange(e)}
                  size="sm"
                />
                <Form.Text className="text-muted">
                  To reset your password, please enter your E2PS email. E2PS
                  will send the password reset instructions to the email address
                  for this account.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Button variant="primary" type="submit" size="sm">
                  Reset Password
                </Button>
              </Form.Group>

              <Form.Group className="my-2">
                <a href="/#" onClick={(e) => forgotPasswordToggle(e)}>
                  Go to login!
                </a>
              </Form.Group>
            </>
          </Form>
        )}
      </div>
    </>
  );
};
