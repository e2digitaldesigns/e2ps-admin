import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import http from '../../../utils/httpServices';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingPage from '../../application/console/_utils/_loading/loading';

export default (props) => {
  const system = useSelector((state) => state.system);
  const [documentState, setDocumentState] = useState({
    docReady: false,
    error: false,
  });

  const [state, setState] = useState({
    userId: '',
    password1: '332310',
    password2: '332310',
  });

  useEffect(() => {
    let stillHere = true;

    async function appMount() {
      try {
        const { data } = await http.get(
          `/passwordReset/${props.match.params.id}`,
        );

        if (data.error.errorCode !== '0x0') {
          throw data;
        }

        if (stillHere === true) {
          setDocumentState((documentState) => ({
            ...documentState,
            docReady: true,
          }));

          setState((state) => ({
            ...state,
            userId: data.result.userId,
          }));
        }
      } catch (error) {
        console.error('System Error', error);
        if (stillHere === true) {
          setDocumentState((documentState) => ({
            ...documentState,
            error: true,
          }));
        }
      }
    }

    appMount();

    return () => {
      stillHere = false;
    };
  }, [props.match.params.id]);

  const onChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (state.password1 !== state.password2) {
      alert('Passwords must match!');
      return;
    }

    try {
      const { data } = await http.put(
        `/passwordReset/${props.match.params.id}`,
        {
          resetId: props.match.params.id,
          type: 'admin',
          userId: state.userId,
          password: state.password1,
          storeOwnerId: system.storeOwnerId,
        },
      );

      if (data.error.errorCode !== '0x0') {
        throw data.error;
      } else {
        // history.push('/login');
      }
    } catch (error) {
      alert('There was an error! Please contact the web site administator.');
      return;
    }
  };

  if (documentState.error) return <h3>This link is no longer available...</h3>;

  if (!documentState.docReady) return <LoadingPage />;

  return (
    <>
      <div className="login-form-holder">
        <h5>Password Reset</h5>
        <Form>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password1"
              value={state.password1}
              onChange={(e) => onChange(e)}
              size="sm"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="password2"
              value={state.password2}
              onChange={(e) => onChange(e)}
              size="sm"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            size="sm"
            disabled={!documentState.docReady}
            onClick={(e) => onSubmit(e)}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};
