import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { updateSystemSettings } from './../../../../../redux/actions/systemSettings/systemSettingsActions';

import {
  alphaNumericValidate,
  emailValidate,
  numberMaxValidate,
  phoneValidate,
} from '../../_utils';

export default () => {
  const dispatch = useDispatch();
  const systemSettings = useSelector(
    (state) => state.systemSettings.settings.contact,
  );

  const [contactState, setcontactState] = useState({ ...systemSettings });

  const formChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === 'companyName' || name === 'contactName') {
      value = alphaNumericValidate(value, true);
    }

    if (name === 'phone') {
      value = phoneValidate(value);
    }

    if (name === 'email') {
      value = emailValidate(value);
    }

    if (name === 'address1' || name === 'city') {
      value = alphaNumericValidate(value, true);
    }

    if (name === 'zipCode') {
      value = numberMaxValidate(value);
    }

    if (value === null) return;
    setcontactState({ ...contactState, [name]: value });
  };

  const contactSubmit = async () => {
    const formData = {
      type: 'contact',
      data: contactState,
    };

    await dispatch(updateSystemSettings(formData));
  };

  return (
    <Card className="main-content-card">
      <Card.Title>
        <span>Contact</span>
      </Card.Title>
      <hr />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Contact Name</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="contactName"
            required
            value={contactState.contactName}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="company"
            required
            value={contactState.company}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="phone"
            required
            value={contactState.phone}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="email"
            required
            value={contactState.email}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="address"
            required
            value={contactState.address}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="city"
            required
            value={contactState.city}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="state"
            required
            value={contactState.state}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>ZipCode</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="zip"
            required
            value={contactState.zip}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button variant="primary" size="sm" onClick={() => contactSubmit()}>
            Submit
          </Button>
        </Form.Group>
      </Form.Row>
    </Card>
  );
};
