import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import AttributeSetOne from "./attribute-holder-set-1";
import AttributeSetTwo from "./attribute-holder-set-2";

export default ({
  moduleCaller = "attribute",
  state,
  handeDeleteAttribute,
  handleFormChange,
  handleOptionFormChange,
  handleAddOption,
  handleRemoveOption,
  handleFormSubmit,
}) => {
  let dataSet, headerName;

  if (moduleCaller === "product") {
    const index = state.product.attributes.findIndex(
      (f) => f._id === state.activeAttributeId
    );

    dataSet = state.product.attributes[index];
    headerName = state.temp.attributes[index].name;
  } else {
    dataSet = state.attribute;
    headerName = state.temp.name;
  }

  return (
    <>
      <Card className="main-content-card">
        <Card.Body>
          <Card.Title>
            <span className="pull-lef">{headerName}</span>
            <Button
              className="pull-right"
              size="sm"
              variant="danger"
              onClick={() => handeDeleteAttribute()}
            >
              Delete Attribute
            </Button>
          </Card.Title>

          <hr />
          <Form autoComplete="off">
            <Form.Row>
              <Form.Group as={Col} sm={12} md={4} lg={3}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  size="sm"
                  required
                  name="name"
                  value={dataSet.name}
                  onChange={(e) => handleFormChange(e, dataSet._id)}
                />
              </Form.Group>

              <Form.Group as={Col} sm={12} md={4} lg={6}>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  as="select"
                  size="sm"
                  required
                  name="type"
                  value={dataSet.type}
                  disabled={dataSet.system}
                  onChange={(e) => handleFormChange(e, dataSet._id)}
                >
                  {dataSet.system && (
                    <option value="0">Paper/Stock GSM/Percentage</option>
                  )}

                  <option value="1">Setup w/Price per Hundred</option>
                  <option value="2">Option w/ Flat Rate</option>
                  <option value="3">Option w/Price per Hundred</option>
                  <option value="4">Option w/Percentage</option>
                  <option value="5">Option w/ Setup & Price per Hundred</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            {dataSet.type && dataSet.type === "1" && (
              <AttributeSetOne
                dataSet={dataSet}
                handleOptionFormChange={handleOptionFormChange}
                handleFormSubmit={handleFormSubmit}
              />
            )}

            {dataSet.type && dataSet.type !== "1" && (
              <AttributeSetTwo
                dataSet={dataSet}
                handleOptionFormChange={handleOptionFormChange}
                handleAddOption={handleAddOption}
                handleRemoveOption={handleRemoveOption}
                handleFormSubmit={handleFormSubmit}
              />
            )}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
