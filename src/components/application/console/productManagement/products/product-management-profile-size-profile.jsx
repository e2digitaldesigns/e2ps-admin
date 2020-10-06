import React from 'react';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default ({ state, handleSizeFormChange, formSubmit }) => {
  const productSize = state.product.productSizes.find(
    (f) => f._id === state.activeSizeId,
  );

  const sizeName = state.temp.productSizes.find(
    (f) => f._id === state.activeSizeId,
  ).size;

  const productCount = state.product.productSizes.length;
  const max = _.maxBy(state.product.productSizes, 'order');
  const maxNum = max && max.order ? parseInt(max.order) : 0;
  const maxOrderNum = productCount > maxNum ? productCount : maxNum;

  return (
    <>
      <Card className="main-content-card">
        <Card.Title>Size: {sizeName}</Card.Title>

        <Form autoComplete="off">
          <Form.Row>
            <Form.Group as={Col} sm={6} md={3}>
              <Form.Check
                id={'isActiveSize'}
                type="switch"
                label={'Is Active'}
                name="isActive"
                checked={productSize.isActive}
                onChange={(e) => handleSizeFormChange(e)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} xs={6} sm={2}>
              <Form.Label>Width</Form.Label>
              <Form.Control
                size="sm"
                name="width"
                value={productSize.size.split('x')[0]}
                onChange={(e) => handleSizeFormChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} xs={6} sm={2}>
              <Form.Label>Height</Form.Label>
              <Form.Control
                size="sm"
                name="height"
                value={productSize.size.split('x')[1]}
                onChange={(e) => handleSizeFormChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} xs={6} sm={2}>
              <Form.Label>DPI</Form.Label>
              <Form.Control
                size="sm"
                name="dpi"
                value={productSize.dpi}
                onChange={(e) => handleSizeFormChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} xs={6} sm={2}>
              <Form.Label>Margin</Form.Label>
              <Form.Control
                size="sm"
                name="margin"
                value={productSize.margin}
                onChange={(e) => handleSizeFormChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} xs={6} sm={2}>
              <Form.Label>Order</Form.Label>
              <Form.Control
                as="select"
                size="sm"
                name="order"
                value={productSize.order}
                onChange={(e) => handleSizeFormChange(e)}
              >
                {_.range(1, maxOrderNum + 1).map((oIndex) => (
                  <option value={oIndex} key={oIndex}>
                    {oIndex}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} xs={6} sm={2}>
              <Form.Label>Design Price</Form.Label>
              <Form.Control
                size="sm"
                name="designPrice1"
                value={productSize.designPrice1}
                onChange={(e) => handleSizeFormChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} xs={6} sm={2}>
              <Form.Label>Design Price 2</Form.Label>
              <Form.Control
                size="sm"
                name="designPrice2"
                value={productSize.designPrice2}
                onChange={(e) => handleSizeFormChange(e)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Button size="sm" onClick={(e) => formSubmit(e)}>
              Save Changes
            </Button>
          </Form.Row>
        </Form>
      </Card>
    </>
  );
};
