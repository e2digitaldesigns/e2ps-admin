import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const defaultStoreId = useSelector(
    (state) => state.system.defaultStoreFrontId,
  );

  const [state, setState] = useState({
    storeFrontId: '',
    name: 'Business Cards',
  });

  useEffect(() => {
    let stillHere = true;
    if (state.storeFrontId === '' && stillHere) {
      setState({ ...state, storeFrontId: defaultStoreId });
    }

    return () => {
      stillHere = false;
    };
  }, [state, defaultStoreId]);

  const formChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === 'name') {
      value = alphaNumericValidate(value);
    }

    if (value === null) return;
    setState({ ...state, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    console.clear();

    try {
      const { data } = await http.post('products/products', { ...state });

      console.log(data);

      if (data.error.errorCode === '0x0') {
        history.push('/console/product-management/product/profile/' + data._id);
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTemplateHeader displayName={'Product Management'} />

      <Card className="main-content-card">
        <Form autoComplete="off" onSubmit={(e) => formSubmit(e)}>
          <Form.Row>
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Store Front</Form.Label>
              <Form.Control
                as="select"
                name="storeFrontId"
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
              <Form.Label>Product Name</Form.Label>
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
