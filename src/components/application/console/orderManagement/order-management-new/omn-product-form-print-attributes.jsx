import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { handleAttributeOptionParser } from "./../../_utils";

export default ({ activeProductAttributes, handleAttributeOptionChange }) => {
  return (
    <>
      {activeProductAttributes.map(
        (m, index) =>
          m.isActive && (
            <Form.Group as={Row} key={index}>
              <Form.Label column="sm" sm={4}>
                {m.name}
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  size="sm"
                  name={m.type}
                  onChange={(e) => handleAttributeOptionChange(e, index)}
                >
                  {handleAttributeOptionParser(m, index)}
                </Form.Control>
              </Col>
            </Form.Group>
          )
      )}
    </>
  );
};
