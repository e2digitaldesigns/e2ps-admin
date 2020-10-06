import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
import FormSwitch from './stafferProfile/staff-management-profile-form-control-switch';

import { updateStaffProfile } from '../../../../redux/actions/staff/staffProfileActions';

import { alphaNumericValidate, emailValidate } from '../_utils';

export default (props) => {
  const dispatch = useDispatch();
  const staffProfile = _.cloneDeep(
    useSelector((state) => state.staffProfile.dataSet),
  );

  const [state, setState] = useState({
    ...staffProfile,
  });

  const formChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === 'name') {
      value = alphaNumericValidate(value, true);
    }

    if (name === 'email') {
      value = emailValidate(value, true);
    }

    if (value !== null) setState({ ...state, [name]: value });
  };

  const formSwitchChange = (e) => {
    let { id, value } = e.target;
    value = !state[id];
    setState({ ...state, [id]: value });
  };

  const permisssionChange = (e) => {
    setState({
      ...state,
      permissions: {
        ...state.permissions,
        [e.target.id]: !state.permissions[e.target.id],
      },
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(updateStaffProfile(state));
      if (result.error.errorCode !== '0x0') throw result;
    } catch (error) {
      console.log(43, error);
      toast.error(error.error.errorDesc);
    }
  };

  return (
    <>
      <PageTemplateHeader
        displayName="Staff Management"
        button={{
          text: 'New Staff Member',
          url: '/console/staff-management/new',
        }}
      />

      <Card className="main-content-card">
        <Form.Row>
          <Form.Group as={Col} sm={12} md={4}>
            <Form.Check
              id="isActive"
              type="switch"
              label="Is Active"
              checked={state.isActive}
              onChange={(e) => formSwitchChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              size="sm"
              required
              value={state.name}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              size="sm"
              required
              value={state.email}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              size="sm"
              required
              value={state.password}
              onChange={(e) => formChange(e)}
            />
          </Form.Group>
        </Form.Row>

        <hr />
        <h6>Permissions</h6>

        <Form.Row>
          <FormSwitch
            id="clientManagement"
            label="Client Management"
            permissions={state.permissions}
            onChange={permisssionChange}
          />

          <FormSwitch
            id="productManagement"
            label="Product Management"
            permissions={state.permissions}
            onChange={permisssionChange}
          />

          <FormSwitch
            id="staffManagement"
            label="Staff Management"
            permissions={state.permissions}
            onChange={permisssionChange}
          />

          <FormSwitch
            id="supplierManagement"
            label="Supplier Management"
            permissions={state.permissions}
            onChange={permisssionChange}
          />
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Button variant="primary" size="sm" onClick={(e) => formSubmit(e)}>
              Submit
            </Button>
          </Form.Group>
        </Form.Row>
      </Card>
    </>
  );
};
