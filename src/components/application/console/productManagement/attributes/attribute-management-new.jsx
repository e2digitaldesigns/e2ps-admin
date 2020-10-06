import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { PageTemplateHeader } from '../../../../template/template-main-content/template-main-content-assets';
import http from '../../../../../utils/httpServices';

import { alphaNumericValidate } from '../../_utils';

export default () => {
  const history = useHistory();

  const [state, setState] = useState({
    name: 'Numbering',
  });

  const formChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === 'name') {
      value = alphaNumericValidate(value, true);
    }

    if (value === null) return;
    setState({ ...state, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    console.clear();

    try {
      const { data } = await http.post('products/productAttributes', {
        ...state,
      });

      console.log(data);

      if (data.error.errorCode === '0x0') {
        history.push(
          '/console/product-management/attribute/profile/' + data._id,
        );
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTemplateHeader displayName={'Attribute Management'} />

      <Card className="main-content-card">
        <Form autoComplete="off" onSubmit={(e) => formSubmit(e)}>
          <Form.Row>
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Attribute Name</Form.Label>
              <Form.Control
                name="name"
                size="sm"
                required
                value={state.name}
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
