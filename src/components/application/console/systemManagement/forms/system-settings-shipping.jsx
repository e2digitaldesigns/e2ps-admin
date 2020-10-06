import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Settingsheader from './../settings-header';

import { updateSystemSettings } from './../../../../../redux/actions/systemSettings/systemSettingsActions';

export default () => {
  const dispatch = useDispatch();

  const systemSettings = useSelector(
    (state) => state.systemSettings.settings.shippingModules,
  );

  const [shippingState, setShippingState] = useState({ ...systemSettings });

  const formChange = (e) => {
    e.preventDefault();
    const theShippingState = _.cloneDeep(shippingState);
    let { value, name } = e.target;
    name = name.split('-');
    theShippingState[name[0]][name[1]] = value;
    setShippingState({ ...theShippingState });
  };

  const shippingModuleSubmit = async () => {
    console.clear();
    const formData = {
      type: 'shippingModules',
      data: shippingState,
    };

    console.log(34, formData);

    const result = await dispatch(updateSystemSettings(formData));
    console.log(60, result);
  };

  return (
    <Card className="main-content-card">
      <Card.Title>
        <span>Shipping</span>
      </Card.Title>

      <Settingsheader section="Global Settings" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="global-state"
            required
            value={shippingState.global.state}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="global-zipCode"
            required
            value={shippingState.global.zipCode}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Up Scale</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="global-upsaleRate"
            required
            value={shippingState.global.upsaleRate}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => shippingModuleSubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>

      <Settingsheader section="FedEx Settings" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="fedEx-isActive"
            required
            value={shippingState.fedEx.isActive}
            onChange={(e) => formChange(e)}
          >
            <option value={false}>in-Active</option>
            <option value={true}>Active</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="fedEx-accountNumber"
            required
            value={shippingState.fedEx.accountNumber}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="fedEx-password"
            required
            value={shippingState.fedEx.password}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Key</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="fedEx-key"
            required
            value={shippingState.fedEx.key}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Meter</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="fedEx-meter"
            required
            value={shippingState.fedEx.meter}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => shippingModuleSubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>

      <Settingsheader section="UPS Settings" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="ups-isActive"
            required
            value={shippingState.ups.isActive}
            onChange={(e) => formChange(e)}
          >
            <option value={false}>in-Active</option>
            <option value={true}>Active</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="ups-userId"
            required
            value={shippingState.ups.userId}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="ups-password"
            required
            value={shippingState.ups.password}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Key</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="ups-key"
            required
            value={shippingState.ups.key}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => shippingModuleSubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>
    </Card>
  );
};
