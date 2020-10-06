import React from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

export default ({
  dataSet,
  handleAddOption,
  handleOptionFormChange,
  handleRemoveOption,
  handleFormSubmit,
}) => {
  const priceLabel =
    dataSet.type === "0" || dataSet.type === "4" ? "Percent" : "Price";

  const colspan = dataSet.type === "5" ? "3" : "2";

  const attrCount = dataSet.options.length;
  const max = _.maxBy(dataSet.options, "order");
  const maxNum = max && max.order ? parseInt(max.order) : 0;
  const maxOrderNum = attrCount > maxNum ? attrCount : maxNum;

  // console.log(25, dataSet);

  return (
    <>
      <Table bordered>
        <thead>
          <tr>
            <th>Option</th>
            {dataSet.type === "0" && <th>GSM</th>}
            {dataSet.type === "5" && <th>Setup Price</th>}
            {dataSet.type === "5" && <th>Min Price</th>}
            <th>{priceLabel}</th>
            <th>Days</th>
            <th>Order</th>
            <th style={{ textAlign: "right" }}>
              <Button size="sm" onClick={() => handleAddOption()}>
                Add <span className="hidden-sm">Option</span>
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataSet.options.map((m, i) => (
            <tr key={i}>
              <td>
                <Form.Control
                  size="sm"
                  name="option"
                  required
                  value={m.option}
                  onChange={(e) => handleOptionFormChange(e, m._id)}
                  placeholder={"Option Name " + i}
                />
              </td>

              {dataSet.type === "0" && (
                <td style={{ maxWidth: "4.5rem" }}>
                  <Form.Control
                    size="sm"
                    name="gsm"
                    value={m.gsm}
                    onChange={(e) => handleOptionFormChange(e, m._id)}
                    placeholder="300"
                  />
                </td>
              )}

              {dataSet.type === "5" && (
                <td style={{ maxWidth: "4.5rem" }}>
                  <Form.Control
                    size="sm"
                    name="setUpPrice"
                    value={m.setUpPrice}
                    onChange={(e) => handleOptionFormChange(e, m._id)}
                    placeholder="0.00"
                  />
                </td>
              )}

              {dataSet.type === "5" && (
                <td style={{ maxWidth: "4.5rem" }}>
                  <Form.Control
                    size="sm"
                    name="minPrice"
                    value={m.minPrice}
                    onChange={(e) => handleOptionFormChange(e, m._id)}
                    placeholder="0.00"
                  />
                </td>
              )}

              <td style={{ maxWidth: "5rem" }}>
                <Form.Control
                  size="sm"
                  name="price"
                  value={m.price}
                  onChange={(e) => handleOptionFormChange(e, m._id)}
                  placeholder="0.00"
                />
              </td>

              <td style={{ maxWidth: "4.5rem" }}>
                <Form.Control
                  size="sm"
                  name="days"
                  value={m.days}
                  onChange={(e) => handleOptionFormChange(e, m._id)}
                  placeholder="0"
                />
              </td>

              <td>
                <Form.Control
                  as="select"
                  size="sm"
                  required
                  name="order"
                  value={parseInt(m.order)}
                  onChange={(e) => handleOptionFormChange(e, m._id)}
                >
                  {_.range(1, maxOrderNum + 1).map((oIndex) => (
                    <option value={oIndex} key={oIndex}>
                      {oIndex}
                    </option>
                  ))}
                </Form.Control>
              </td>

              <td style={{ textAlign: "right" }}>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleRemoveOption(m._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan={colspan}>
              <Button size="sm" onClick={(e) => handleFormSubmit(e)}>
                Save Changes
              </Button>
            </td>
            <td colSpan={colspan}></td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
