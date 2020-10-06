import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default ({ labelCol, fieldCol, orderState, handleOrderFormChange }) => {
  return (
    <>
      <Form.Group as={Row}>
        <Form.Label column="sm" sm={labelCol}>
          Theme
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            as="textarea"
            rows="5"
            size="sm"
            name="designTheme"
            value={orderState.designTheme}
            onChange={(e) => handleOrderFormChange(e)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column="sm" sm={labelCol}>
          Side 01
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            as="textarea"
            rows="5"
            size="sm"
            name="designInfoSide1"
            value={orderState.designInfoSide1}
            onChange={(e) => handleOrderFormChange(e)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column="sm" sm={labelCol}>
          Side 02
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            as="textarea"
            rows="5"
            size="sm"
            name="designInfoSide2"
            value={orderState.designInfoSide2}
            onChange={(e) => handleOrderFormChange(e)}
          />
        </Col>
      </Form.Group>
    </>
  );
};
