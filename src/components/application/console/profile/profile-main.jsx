import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import _ from 'lodash';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { alphaNumericValidate, emailValidate } from '../_utils';

import LoadingPage from '../_utils/_loading/loading';
import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';

import {
  fetchProfile,
  updateProfile,
} from '../../../../redux/actions/profile/profileActions';

export default () => {
  const dispatch = useDispatch();
  const dataSet = useSelector((state) => state.myProfile.dataSet);
  const [documentState, setDocumentState] = useState({ docReady: true });

  const [state, setState] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await dispatch(fetchProfile());

        if (result.error.errorCode === '0x0') {
          setDocumentState((documentState) => ({
            ...documentState,
            docReady: true,
          }));

          setState((state) => ({
            ...state,
            name: result.dataSet.name,
            email: result.dataSet.email,
          }));
        } else {
          throw result;
        }
      } catch (err) {
        toast.error(err.error.errorDesc);
      }
    };

    loadData();
  }, [dispatch]);

  const formChange = async (e) => {
    e.preventDefault();
    const theState = _.cloneDeep(state);
    let { name, value } = e.target;

    switch (name) {
      default:
      case 'name':
        value = alphaNumericValidate(value);
        break;

      case 'email':
        value = emailValidate(value, 5);
        break;
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
  };

  const theFormSubmit = async (e) => {
    e.preventDefault();

    let updatePassword = 0;

    if (state.password1.length > 0) {
      if (state.password1 !== state.password2) {
        console.error('passwords must match');
        return;
      }
    }

    if (state.password1.length > 6 && state.password1 !== state.password2) {
      updatePassword = 1;
    }

    const formData = { ...state, updatePassword };
    await dispatch(updateProfile(formData));
  };

  if (!documentState.docReady) return <LoadingPage />;

  return (
    <>
      <PageTemplateHeader displayName={'My Profile'} />

      <Card className="main-content-card">
        <Card.Title>{dataSet.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {dataSet.name}
        </Card.Subtitle>
      </Card>

      <Card className="main-content-card">
        <Form autoComplete="off" onSubmit={(e) => formSubmit(e)}>
          <Form.Row>
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                size="sm"
                name="name"
                required
                value={state.name}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="sm"
                name="email"
                required
                value={state.email}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                size="sm"
                name="password1"
                required
                value={state.password1}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                size="sm"
                name="password2"
                required
                value={state.password2}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" size="sm" onClick={(e) => theFormSubmit(e)}>
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );
};
