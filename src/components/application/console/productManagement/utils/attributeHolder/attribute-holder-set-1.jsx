import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default ({ dataSet, handleOptionFormChange, handleFormSubmit }) => {
  const optOne = dataSet.options[0] ? dataSet.options[0] : [];

  return (
    <>
      <hr />
      <Form.Row>
        <Form.Group as={Col} sm={12} md={4} lg={3}>
          <Form.Label>Set Up Price </Form.Label>
          <Form.Control
            size="sm"
            name="setUpPrice"
            value={optOne.setUpPrice}
            onChange={(e) => handleOptionFormChange(e, optOne._id)}
            placeholder="0.00"
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={4} lg={3}>
          <Form.Label>Price Per Hundred</Form.Label>
          <Form.Control
            size="sm"
            name="price"
            value={optOne.price}
            onChange={(e) => handleOptionFormChange(e, optOne._id)}
            placeholder="0.00"
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={4} lg={3}>
          <Form.Label>Minimum Price</Form.Label>
          <Form.Control
            size="sm"
            name="minPrice"
            value={optOne.minPrice}
            onChange={(e) => handleOptionFormChange(e, optOne._id)}
            placeholder="0.00"
          />
        </Form.Group>

        <Form.Group as={Col} sm={12} md={4} lg={3}>
          <Form.Label>Days</Form.Label>
          <Form.Control
            size="sm"
            name="days"
            value={optOne.days}
            onChange={(e) => handleOptionFormChange(e, optOne._id)}
            placeholder="0.00"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} sm={12} md={4} lg={3}>
          <Button size="sm" onClick={(e) => handleFormSubmit(e, optOne._id)}>
            Save Changes
          </Button>
        </Form.Group>
      </Form.Row>
    </>
  );
};
