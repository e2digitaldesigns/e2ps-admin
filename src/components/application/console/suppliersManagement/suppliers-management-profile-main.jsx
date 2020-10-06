import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { updateSupplierProfile } from '../../../../redux/actions/suppliers/supplierProfileActions';

import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
import { FormStates } from '../../../../utils/forms';

import {
  alphaNumericValidate,
  emailValidate,
  numberMaxValidate,
  phoneValidate,
} from '../_utils';

export default () => {
  const dispatch = useDispatch();
  const supplierProfile = _.cloneDeep(
    useSelector((state) => state.supplierProfile.dataSet),
  );

  const [supplierState, setSupplierState] = useState({ ...supplierProfile });

  const formChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === 'companyName' || name === 'contactName') {
      value = alphaNumericValidate(value, true);
    }

    if (name === 'phone') {
      value = phoneValidate(value);
    }

    if (name === 'email' || name === 'orderEmail') {
      value = emailValidate(value);
    }

    if (name === 'address1' || name === 'address2' || name === 'city') {
      value = alphaNumericValidate(value, true);
    }

    if (name === 'zipCode') {
      value = numberMaxValidate(value);
    }

    if (value === null) return;
    setSupplierState({ ...supplierState, [name]: value });
  };

  const formSwitchChange = (e) => {
    let { id } = e.target;
    const theSupplierState = _.cloneDeep(supplierState);
    setSupplierState({ ...theSupplierState, [id]: !theSupplierState[id] });
  };

  const theFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateSupplierProfile(supplierState));
    } catch (error) {
      console.log(43, error);
    }
  };

  return (
    <>
      <PageTemplateHeader
        displayName="Supplier Management"
        button={{
          text: 'New Supplier',
          url: '/console/ssuppliers-management/new',
        }}
      />

      <Card className="main-content-card">
        <Form.Row>
          <Form.Group as={Col} sm={12} md={4}>
            <Form.Check
              id="isActive"
              type="switch"
              label="Is Active"
              checked={supplierState.isActive}
              onChange={(e) => formSwitchChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              size="sm"
              name="companyName"
              required
              value={supplierState.companyName}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Contact Name</Form.Label>
            <Form.Control
              size="sm"
              name="contactName"
              value={supplierState.contactName}
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
              value={supplierState.phone}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              size="sm"
              placeholder="Enter email"
              value={supplierState.email}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              size="sm"
              name="address1"
              placeholder="1234 Main St"
              value={supplierState.address1}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              size="sm"
              name="address2"
              placeholder="Apartment, studio, or floor"
              value={supplierState.address2}
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
              value={supplierState.city}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={12} md={4}>
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              name="state"
              size="sm"
              value={supplierState.state}
              onChange={(e) => formChange(e)}
            >
              <option>Choose...</option>
              <FormStates />
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} sm={12} md={4}>
            <Form.Label>Zip</Form.Label>
            <Form.Control
              name="zipCode"
              size="sm"
              value={supplierState.zipCode}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <hr />

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Order Email</Form.Label>
            <Form.Control
              type="email"
              name="orderEmail"
              size="sm"
              placeholder="Enter email"
              value={supplierState.orderEmail}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Email Orders</Form.Label>
            <Form.Control
              as="select"
              name="emailOrders"
              size="sm"
              value={supplierState.emailOrders}
              onChange={(e) => formChange(e)}
            >
              <option value={true}>
                Yes, Supplier excepts order by email!
              </option>

              <option value={false}>No</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <hr />

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="memo"
              rows="3"
              value={supplierState.memo}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => theFormSubmit(e)}
            >
              Submit
            </Button>
          </Form.Group>
        </Form.Row>
      </Card>
    </>
  );
};
