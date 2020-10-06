import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
import http from './../../../../utils/httpServices';

import { alphaNumericValidate, emailValidate, phoneValidate } from '../_utils';

export default () => {
  const history = useHistory();
  const defaultStoreId = useSelector(
    (state) => state.system.defaultStoreFrontId,
  );

  const [state, setState] = useState({
    storeFrontId: defaultStoreId,
    companyName: 'company name',
    firstName: 'First name',
    lastName: 'Last name',
    phone: '313-555-1212',
    email: Math.random().toString(36).substring(2, 8) + '@email.com',
  });

  const formChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === 'companyName' || name === 'firstName' || name === 'lastName') {
      value = alphaNumericValidate(value, true);
    }

    if (name === 'phone') {
      value = phoneValidate(value, true);
    }

    if (name === 'email') {
      value = emailValidate(value, true);
    }

    if (value === null) return;
    setState({ ...state, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await http.post('customers', { ...state });
      if (data.error.errorCode === '0x0') {
        history.push('/console/customer-management/profile/' + data._id);
      } else {
        throw data.error;
      }
    } catch (error) {
      toast.error(error.errorDesc);
      console.log(error);
    }
  };

  return (
    <>
      <PageTemplateHeader displayName={'Client Management'} />

      <Card className="main-content-card">
        <Form autoComplete="off" onSubmit={(e) => formSubmit(e)}>
          <Form.Row>
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Store Front</Form.Label>
              <Form.Control
                name="storeFrontId"
                as="select"
                size="sm"
                value={state.storeFrontId}
                onChange={(e) => formChange(e)}
              >
                {useSelector((state) => state.system.storeFronts).map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.domain + ' - ' + m.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                name="companyName"
                size="sm"
                required
                value={state.companyName}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                size="sm"
                required
                value={state.firstName}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                size="sm"
                required
                value={state.lastName}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                size="sm"
                required
                value={state.phone}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                size="sm"
                required
                value={state.email}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit" size="sm">
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );
};
