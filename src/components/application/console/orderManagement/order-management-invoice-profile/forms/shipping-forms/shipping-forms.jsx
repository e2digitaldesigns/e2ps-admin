import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import http from './../../../../../../../utils/httpServices';
import { updateInvoiceSegmentById } from '../../../../../../../redux/actions/invoices/invoiceActions';
import {
  moneyValidate,
  alphaNumericValidate,
  phoneValidate,
  numberMaxValidate,
} from '../../../../_utils';

export default ({ orderId }) => {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice.invoice);
  const order = _.cloneDeep(invoice.storeInvoiceItems.find((f) => orderId));
  const customers = _.cloneDeep(invoice.customers);

  const shippingProfiles = useSelector(
    (state) => state.invoice.invoice.customers.shippingProfiles,
  );

  const shipping = _.cloneDeep(order.item.shipping);
  const [shippingState, setShippingState] = useState({ ...shipping });

  const [shippingRateState, setShippingRateState] = useState({
    selectedIndex: -1,
    rates: [],
  });

  const [shippingProfileState, setShippingProfileState] = useState({
    selectedProfileIndex: -1,
    profileName: '',
    saveProfile: false,
    // profiles: shippingProfiles,
    // profiles: customers.shippingProfiles,
  });

  const handleShippingServiceChange = (e) => {
    let value = parseFloat(e.target.value);
    let price = value > -1 ? shippingRateState.rates[value].amount : '0.00';

    setShippingRateState({
      ...shippingRateState,
      selectedIndex: value,
    });

    setShippingState({ ...shippingState, price });
  };

  const handleShippingSelectProfileFormChange = (e) => {
    console.clear();
    const value = parseFloat(e.target.value);

    setShippingProfileState({
      ...shippingProfileState,
      selectedProfileIndex: parseFloat(value),
      saveProfile: false,
      profileName: value === -1 ? '' : shippingProfiles[value].profileName,
    });

    if (value > -1) {
      const newShippingAddress = shippingProfiles[value];
      delete newShippingAddress._id;
      delete newShippingAddress.profileName;
      setShippingState({
        ...shippingState,
        ...newShippingAddress,
      });
    }
  };

  const handleShippingProfileFormChange = (e) => {
    console.clear();
    let { name, value } = e.target;

    if (name === 'profileName') value = alphaNumericValidate(value, true);

    if (value)
      setShippingProfileState({ ...shippingProfileState, [name]: value });
  };

  const handleFormChange = (e) => {
    let { name, value } = e.target;
    console.log(88, name, value);

    switch (name) {
      case 'price':
        value = moneyValidate(value);
        break;

      case 'weight':
        value = moneyValidate(value);
        break;

      default:
      case 'trackingNumber':
      case 'company':
      case 'name':
      case 'address1':
      case 'address2':
      case 'city':
        value = alphaNumericValidate(value);
        break;

      case 'zipCode':
        value = numberMaxValidate(value, 5);
        break;

      case 'phone':
        value = phoneValidate(value);
        break;
    }

    if (value !== null) setShippingState({ ...shippingState, [name]: value });
  };

  const fetchShippingRates = async () => {
    console.clear();
    const ratesButton = document.querySelector(
      '#fetchShippingRatesButton_' + orderId,
    );

    const serviceButton = document.querySelector(
      '#updateShippingServiceButton_' + orderId,
    );

    const select = document.querySelector('#shipTypeSelect_' + orderId);
    ratesButton.disabled = true;
    serviceButton.disabled = true;
    select.disabled = true;

    setShippingState({ ...shippingState, price: '0.00' });

    setShippingRateState({
      ...shippingRateState,
      selectedIndex: 0,
      rates: [{ service: 'Loading...', amount: '' }],
    });

    const { data } = await http.post(
      '/shipping/fetchShippingRates',
      shippingState,
    );

    ratesButton.disabled = false;
    serviceButton.disabled = false;
    select.disabled = false;

    console.log(121, data, data.error.errorCode);

    if (data.error.errorCode === '0x0') {
      setShippingRateState({ ...shippingRateState, rates: data.dataSet });
    } else {
      setShippingRateState({
        ...shippingRateState,
        selectedIndex: -1,
        rates: [],
      });
    }
  };

  const updateShippingService = async () => {
    const serviceButton = document.querySelector(
      '#updateShippingServiceButton_' + orderId,
    );

    serviceButton.disabled = true;
    const selectedIndex = shippingRateState.selectedIndex;

    //amount
    const { service } =
      selectedIndex === -1
        ? { service: 'Customer Pick Up', amount: '0.00' }
        : shippingRateState.rates[selectedIndex];

    await dispatch(
      updateInvoiceSegmentById({
        id: orderId,
        name: 'updateShippingService',
        service,
        amount: shippingState.price,
        weight: shippingState.weight,
        trackingNumber: shippingState.trackingNumber,
      }),
    );

    setTimeout(() => {
      serviceButton.disabled = false;
    }, 1000);
  };

  const updateShippingAddress = async () => {
    const button = document.querySelector(
      '#updateShippingAddressButton_' + orderId,
    );

    button.disabled = true;

    await dispatch(
      updateInvoiceSegmentById({
        id: orderId,
        name: 'updateShippingAddress',
        shippingState,
        shippingProfileState,
        cId: customers._id,
      }),
    );

    setTimeout(() => {
      button.disabled = false;
    }, 1000);
  };

  const labelCol = 4;
  const fieldCol = 8;

  return (
    <>
      <span
        id={`shipping-${orderId}`}
        className={`editMenuClasser editMenuClasser-${orderId}`}
      >
        <li>
          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Ship Type
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                id={`shipTypeSelect_${orderId}`}
                as="select"
                size="sm"
                name="service"
                value={shippingRateState.selectedIndex}
                onChange={(e) => handleShippingServiceChange(e)}
              >
                <option value={-1}>Customer Pick Up</option>
                {shippingRateState.rates.map((m, index) => (
                  <option key={index} value={index}>
                    {m.service} - {m.amount}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Price
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="price"
                value={shippingState.price}
                onChange={(e) => handleFormChange(e)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Weight
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="weight"
                value={shippingState.weight}
                onChange={(e) => handleFormChange(e)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Tracking Num
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="trackingNumber"
                value={shippingState.trackingNumber}
                onChange={(e) => handleFormChange(e)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Col>
              <Button
                variant="primary"
                size="sm"
                id={`fetchShippingRatesButton_${orderId}`}
                onClick={() => fetchShippingRates()}
              >
                {' '}
                Get Shipping Options
              </Button>

              <Button
                variant="primary"
                size="sm"
                className="ml-2"
                id={`updateShippingServiceButton_${orderId}`}
                onClick={() => updateShippingService()}
              >
                Update Shipping
              </Button>
            </Col>
          </Form.Group>
        </li>

        <li>
          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Ship To
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                as="select"
                size="sm"
                name="selectedProfileIndex"
                value={shippingProfileState.selectedProfileIndex}
                onChange={(e) => handleShippingSelectProfileFormChange(e)}
              >
                <option value={-1}>New Shipping Address / Profile</option>
                {shippingProfiles.map((m, index) => (
                  <option key={index} value={index}>
                    {m.profileName}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Profile Name
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="profileName"
                value={shippingProfileState.profileName}
                onChange={(e) => handleShippingProfileFormChange(e)}
                disabled={shippingProfileState.selectedProfileIndex !== -1}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Ship Type
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                as="select"
                size="sm"
                name="type"
                value={shippingState.type}
                onChange={(e) => handleFormChange(e)}
                disabled={shippingProfileState.selectedProfileIndex !== -1}
              >
                <option value="RES">Residential</option>
                <option value="COM">Commercial</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Company
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="company"
                value={shippingState.company}
                onChange={(e) => handleFormChange(e)}
                disabled={shippingProfileState.selectedProfileIndex !== -1}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Name
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="name"
                value={shippingState.name}
                onChange={(e) => handleFormChange(e)}
                disabled={shippingProfileState.selectedProfileIndex !== -1}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Phone
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="phone"
                value={shippingState.phone}
                onChange={(e) => handleFormChange(e)}
                disabled={shippingProfileState.selectedProfileIndex !== -1}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Address
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="address1"
                value={shippingState.address1}
                onChange={(e) => handleFormChange(e)}
                disabled={shippingProfileState.selectedProfileIndex !== -1}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Address 2
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="address2"
                value={shippingState.address2}
                onChange={(e) => handleFormChange(e)}
                disabled={shippingProfileState.selectedProfileIndex !== -1}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              City
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="city"
                value={shippingState.city}
                onChange={(e) => handleFormChange(e)}
                disabled={shippingProfileState.selectedProfileIndex !== -1}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              State
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="state"
                value={shippingState.state}
                onChange={(e) => handleFormChange(e)}
                disabled={shippingProfileState.selectedProfileIndex !== -1}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Zip
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                size="sm"
                name="zipCode"
                value={shippingState.zipCode}
                onChange={(e) => handleFormChange(e)}
                disabled={shippingProfileState.selectedProfileIndex !== -1}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Form.Label column="sm" sm={labelCol}>
              Save Profile
            </Form.Label>
            <Col sm={fieldCol}>
              <Form.Control
                as="select"
                size="sm"
                name="saveProfile"
                value={shippingProfileState.saveProfile}
                onChange={(e) => handleShippingProfileFormChange(e)}
                disabled={shippingProfileState.selectedProfileIndex !== -1}
              >
                <option value={false}>No, One time use.</option>
                <option value={true}>Yes, Save the shipping profile.</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="formGroupRow">
            <Col>
              <Button
                id={`updateShippingAddressButton_${orderId}`}
                variant="primary"
                type="submit"
                size="sm"
                block
                onClick={() => updateShippingAddress()}
              >
                Update Shipping Address
              </Button>
            </Col>
          </Form.Group>
        </li>
      </span>
    </>
  );
};
