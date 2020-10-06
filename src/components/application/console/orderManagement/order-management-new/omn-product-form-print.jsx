import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { handleProductSidesOptionParser } from "./../../_utils";

export default ({
  labelCol,
  fieldCol,
  productState,
  activeProductQuantities,
  handleProductQuantityChange,
  handleProductSidesChange,
}) => {
  return (
    <>
      <Form.Group as={Row}>
        <Form.Label column="sm" sm={labelCol}>
          Qty
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            as="select"
            size="sm"
            name="productQuantity"
            value={productState.activeProductQuantityIndex}
            onChange={(e) => handleProductQuantityChange(e)}
          >
            {activeProductQuantities.map(
              (m, index) =>
                m.isActive && (
                  <option key={index} value={index}>
                    {m.quantity}
                  </option>
                )
            )}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column="sm" sm={labelCol}>
          Sides
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            as="select"
            size="sm"
            name="productSides"
            value={productState.activeProductSides}
            onChange={(e) => handleProductSidesChange(e)}
          >
            {handleProductSidesOptionParser(productState)}
          </Form.Control>
        </Col>
      </Form.Group>
    </>
  );
};
