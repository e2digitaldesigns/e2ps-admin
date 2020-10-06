import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import http from '../../../utils/httpServices';
import Alert from 'react-bootstrap/Alert';
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
    password1: '332310',
    password2: '332310',
  });

  useEffect(() => {
    let stillHere = true;

    async function appMount() {
      try {
        const { data: result } = await http.get(
          `/passwordReset/${props.match.params.id}`,
        );

        console.clear();
        console.log(24, result);

        if (result.error.errorCode !== '0x0') {
          throw result;
        }

        setDocumentState((documentState) => ({
          ...documentState,
          docReady: true,
        }));
      } catch (error) {
        console.log('System Error', error);
        setDocumentState((documentState) => ({
          ...documentState,
          error: true,
        }));
      }
    }

    appMount();

    return () => {
      stillHere = false;
    };
  }, []);

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
      const result = await http.put(`/passwordReset/${props.match.params.id}`, {
        password: state.password1,
        storeOwnerId: system.storeOwnerId,
      });
    } catch (error) {}
  };

  // if (!documentState.docReady) return <LoadingPage />;

  // if (documentState.error) return <h3>This link is no longer available...</h3>;

  return (
    <h3>
      <div className="login-form-holder">
        <Form>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password1"
              value={state.password1}
              onChange={(e) => onChange(e)}
              size="sm"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
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
    </h3>
  );
};
