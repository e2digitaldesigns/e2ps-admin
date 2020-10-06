import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default ({ id, label, permissions, onChange }) => {
  return (
    <>
      {permissions[id] !== undefined && (
        <Form.Group as={Col} sm={12} md={4}>
          <Form.Check
            id={id}
            type="switch"
            label={label}
            checked={permissions[id]}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
      )}
    </>
  );
};
