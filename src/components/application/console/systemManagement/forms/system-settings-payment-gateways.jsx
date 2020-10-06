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
    (state) => state.systemSettings.settings.paymentGateway,
  );

  console.log(19, systemSettings);

  const [paymentState, setPaymentState] = useState({ ...systemSettings });

  const formChange = (e) => {
    e.preventDefault();
    const thePaymentState = _.cloneDeep(paymentState);
    let { value, name } = e.target;
    name = name.split('-');
    thePaymentState[name[0]][name[1]] = value;
    setPaymentState({ ...thePaymentState });
  };

  const activeFormChange = (e) => {
    e.preventDefault();
    const thePaymentState = _.cloneDeep(paymentState);
    let { name, value } = e.target;
    name = name.split('-');

    console.log(38, name, value);

    thePaymentState.authorizeNet.isActive =
      name[0] !== 'authorizeNet' ? false : value;

    thePaymentState.payPalPro.isActive =
      name[0] !== 'payPalPro' ? false : value;

    thePaymentState.square.isActive = name[0] !== 'square' ? false : value;

    setPaymentState({ ...thePaymentState });
  };

  const paymentGatewaySubmit = async () => {
    console.clear();
    // console.log(53, paymentState);
    // return;

    const formData = {
      type: 'paymentGateway',
      data: paymentState,
    };

    const result = await dispatch(updateSystemSettings(formData));
    console.log(60, result);
  };

  return (
    <Card className="main-content-card">
      <Card.Title>
        <span>Payment Gateways</span>
      </Card.Title>

      <Settingsheader section="Authorize.Net" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="authorizeNet-isActive"
            required
            value={paymentState.authorizeNet.isActive}
            onChange={(e) => activeFormChange(e)}
          >
            <option value={false}>in-Active</option>
            <option value={true}>Active</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="authorizeNet-id"
            required
            value={paymentState.authorizeNet.id}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Key</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="authorizeNet-key"
            required
            value={paymentState.authorizeNet.key}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => paymentGatewaySubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>

      <Settingsheader section="PayPal" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="payPal-email"
            required
            value={paymentState.payPal.email}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => paymentGatewaySubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>

      {/* <Settingsheader section="PayPal Pro" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Id</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="payPalPro-isActive"
            required
            value={paymentState.payPalPro.isActive}
            onChange={(e) => activeFormChange(e)}
          >
            <option value={false}>in-Active</option>
            <option value={true}>Active</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="payPalPro-email"
            required
            value={paymentState.payPalPro.email}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>User</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="payPalPro-user"
            required
            value={paymentState.payPalPro.user}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="payPalPro-password"
            required
            value={paymentState.payPalPro.password}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Signature</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="payPalPro-signature"
            required
            value={paymentState.payPalPro.signature}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => paymentGatewaySubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row> */}

      <Settingsheader section="Square" />

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Id</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="square-isActive"
            required
            value={paymentState.square.isActive}
            onChange={(e) => activeFormChange(e)}
          >
            <option value={false}>in-Active</option>
            <option value={true}>Active</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Application Id</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="square-applicationId"
            required
            value={paymentState.square.applicationId}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Access Token</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            name="square-accessToken"
            required
            value={paymentState.square.accessToken}
            onChange={(e) => formChange(e)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} sm={12} md={6}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => paymentGatewaySubmit()}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>
    </Card>
  );
};
