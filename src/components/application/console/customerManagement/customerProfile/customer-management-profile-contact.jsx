import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Script from 'react-load-script';
import _ from 'lodash';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { updateCustomerProfile } from '../../../../../redux/actions/customers/customerProfileActions';
import { FormStates } from '../../../../../utils/forms';
import {
  alphaNumericValidate,
  phoneValidate,
  numberMaxValidate,
  emailValidate,
} from '../../_utils';

/* eslint-disable no-undef */
export default () => {
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);
  const customer = useSelector((state) => state.customerProfile);
  let autocomplete;

  const [customerState, setCustomerState] = useState({
    _id: '',
    isActive: false,
    storeFrontId: '',
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    mobile: '',
    pin: '',
    address1: '',
    address2: '',
    city: '',
    zipCode: '',
  });

  useEffect(() => {
    let stillHere = true;

    if (!customer.dataSet || !customer.dataSet.contact) return;

    if (stillHere === true) {
      setCustomerState((customerState) =>
        setCustomerState({
          ...customerState,
          _id: customer.dataSet._id,
          isActive: customer.dataSet.isActive,
          storeFrontId: customer.dataSet.storeFrontId,
          ...customer.dataSet.contact,
        }),
      );
    }

    return () => {
      stillHere = false;
    };
  }, [customer.dataSet]);

  const handleScriptLoad = () => {
    const options = {
      types: ['address'],
    };

    autocomplete = new google.maps.places.Autocomplete(
      document.querySelector('#address1'),
      options,
    );

    autocomplete.setFields(['address_components', 'formatted_address']);
    autocomplete.addListener('place_changed', handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    console.clear();
    const returnAddress = {};
    const addressObject = autocomplete.getPlace();
    const address = addressObject.address_components;

    if (address) {
      for (var i = 0; i < address.length; i++) {
        // console.log(address[i].long_name, address[i].types[0]);

        switch (address[i].types[0]) {
          case 'street_number':
            returnAddress.street_number = address[i].long_name;
            break;

          case 'route':
            returnAddress.route = address[i].long_name;
            break;

          case 'locality':
            returnAddress.locality = address[i].long_name;
            break;

          case 'administrative_area_level_1':
            returnAddress.administrative_area_level_1 = address[i].short_name;
            break;

          case 'postal_code':
            returnAddress.postal_code = address[i].short_name;
            break;

          case 'postal_code_suffix':
            returnAddress.postal_code_suffix = address[i].short_name;
            break;

          case 'country':
            returnAddress.country = address[i].short_name;
            break;

          default:
            break;
        }
      }

      returnAddress.address =
        returnAddress.street_number && returnAddress.route
          ? returnAddress.street_number + ' ' + returnAddress.route
          : returnAddress.street_number && returnAddress.street_number;

      returnAddress.postal_coding =
        returnAddress.postal_code && returnAddress.postal_code_suffix
          ? returnAddress.postal_code + '-' + returnAddress.postal_code_suffix
          : returnAddress.postal_code && returnAddress.postal_code;

      setCustomerState((customerState) => ({
        ...customerState,
        address1: returnAddress.address,
        city: returnAddress.locality,
        state: returnAddress.administrative_area_level_1,
        zipCode: returnAddress.postal_coding,
      }));
    }
  };

  const formChange = (e) => {
    e.preventDefault();
    const theCustomerState = _.cloneDeep(customerState);
    let { name, value } = e.target;

    if (name === 'isActive' || name === 'storeFrontId') {
      value = value === 'true' ? true : value === 'false' ? false : value;
      setCustomerState({ ...theCustomerState, [name]: value });
      return;
    }

    switch (name) {
      default:
      case 'companyName':
      case 'firstName':
      case 'lastName':
      case 'address1':
      case 'address2':
      case 'city':
        value = alphaNumericValidate(value);
        break;

      case 'zipCode':
        value = numberMaxValidate(value, 5);
        break;

      case 'email':
        value = emailValidate(value, 5);
        break;

      case 'mobile':
      case 'phone':
        value = phoneValidate(value);
        break;

      case 'pin':
        value = numberMaxValidate(value, 4);
        break;
    }

    theCustomerState[name] = value;
    if (value !== null) setCustomerState({ ...theCustomerState });
  };

  const formSwitchChange = (e) => {
    let { id, value } = e.target;
    const theCustomerState = _.cloneDeep(customerState);

    value = !theCustomerState[id];
    setCustomerState({ ...theCustomerState, [id]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
  };

  const theFormSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...customerState, updateType: 'contact' };
    await dispatch(updateCustomerProfile(formData));
  };

  return (
    <>
      <Form autoComplete="off" onSubmit={(e) => formSubmit(e)}>
        <Form.Row>
          <Form.Group as={Col} sm={12} md={4}>
            <Form.Check
              id="isActive"
              type="switch"
              label="Is Active"
              checked={customerState.isActive}
              onChange={(e) => formSwitchChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Store Front</Form.Label>
            <Form.Control
              as="select"
              name="storeFrontId"
              size="sm"
              value={customerState.storeFrontId}
              onChange={(e) => formChange(e)}
            >
              {system.storeFronts.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.domain + ' - ' + m.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              name="companyName"
              size="sm"
              required
              value={customerState.companyName}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              size="sm"
              name="firstName"
              required
              value={customerState.firstName}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              size="sm"
              name="lastName"
              required
              value={customerState.lastName}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="phone"
              name="phone"
              size="sm"
              required
              value={customerState.phone}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              size="sm"
              required
              placeholder="Enter email"
              value={customerState.email}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <hr />

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Cell Phone</Form.Label>
            <Form.Control
              type="phone"
              name="mobile"
              size="sm"
              value={customerState.mobile}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>PIN</Form.Label>
            <Form.Control
              type="text"
              name="pin"
              size="sm"
              placeholder="5555"
              value={customerState.pin}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <hr />

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6} controlId="address1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              size="sm"
              name="address1"
              placeholder="1234 Main St"
              value={customerState.address1}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              size="sm"
              name="address2"
              placeholder="Apartment, studio, or floor"
              value={customerState.address2}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={4}>
            <Form.Label>City</Form.Label>
            <Form.Control
              size="sm"
              name="city"
              value={customerState.city}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={12} md={4}>
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              name="state"
              value={customerState.state}
              onChange={(e) => formChange(e)}
            >
              <option>Choose...</option>
              <FormStates />
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} sm={12} md={4}>
            <Form.Label>Zip</Form.Label>
            <Form.Control
              size="sm"
              name="zipCode"
              value={customerState.zipCode}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" size="sm" onClick={(e) => theFormSubmit(e)}>
          Submit
        </Button>
      </Form>

      <Script
        url={process.env.REACT_APP_GOOGLE_PLACES_API}
        onLoad={handleScriptLoad}
      />
    </>
  );
};
