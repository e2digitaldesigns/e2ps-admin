import React from 'react';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { FaTrash } from 'react-icons/fa';
import AttributeHolder from '../utils/attributeHolder/attribute-holder';

export default ({
  state,
  handleNewAttribute,
  handleAttrSelector,
  handeDeleteAttribute,
  handleFormChange,
  handleOptionFormChange,
  handleAddOption,
  handleRemoveOption,
  handleFormSubmit,
}) => {
  const activeAttributeId = state.activeAttributeId;
  const attributes = state.product.attributes;
  const temp = state.temp.attributes;

  const attrCount = attributes.length;
  const max = _.maxBy(attributes, 'order');
  const maxNum = max && max.order ? parseInt(max.order) : 0;
  const maxOrderNum = attrCount > maxNum ? attrCount : maxNum;

  return (
    <>
      <Card className="main-content-card">
        <Card.Title>
          <span>Attributes ({attrCount})</span>
          <Button
            className="pull-right"
            size="sm"
            onClick={() => handleNewAttribute(maxOrderNum)}
          >
            New Attribute
          </Button>
        </Card.Title>

        <Form autoComplete="off">
          <Form.Row>
            <Table striped hover size="sm" className="listingTable mt-3">
              <thead>
                <tr>
                  <th className="hidden-sm">Name</th>
                  <th>Order</th>
                  <th>Active</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {attributes.map((m, i) => (
                  <tr key={i}>
                    <td className="hidden-sm">
                      <span onClick={() => handleAttrSelector(m._id)}>
                        {temp[i] && temp[i].name}
                      </span>
                    </td>
                    <td>
                      <Form.Control
                        as="select"
                        size="sm"
                        required
                        name="order"
                        value={m.order}
                        onChange={(e) => handleFormChange(e, m._id)}
                      >
                        {_.range(1, maxOrderNum + 1).map((oIndex) => (
                          <option value={oIndex} key={oIndex}>
                            {oIndex}
                          </option>
                        ))}
                      </Form.Control>
                    </td>
                    <td colSpan={m.system ? 2 : 1}>
                      <Form.Check
                        id={m._id + '_attr_isActive'}
                        name={'isActive'}
                        type="switch"
                        label={''}
                        checked={m.isActive}
                        onChange={(e) => handleFormChange(e, m._id)}
                      />
                    </td>
                    {!m.system && (
                      <td style={{ textAlign: 'right' }}>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handeDeleteAttribute(m._id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form.Row>

          <>
            <hr />
            <Form.Row>
              <Button size="sm" onClick={(e) => handleFormSubmit(e)}>
                Save Changes
              </Button>
            </Form.Row>
          </>
        </Form>
      </Card>

      {activeAttributeId && (
        <AttributeHolder
          moduleCaller="product"
          state={state}
          handeDeleteAttribute={handeDeleteAttribute}
          handleFormChange={handleFormChange}
          handleOptionFormChange={handleOptionFormChange}
          handleAddOption={handleAddOption}
          handleRemoveOption={handleRemoveOption}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </>
  );
};
