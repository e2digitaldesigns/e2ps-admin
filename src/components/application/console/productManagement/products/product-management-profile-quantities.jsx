import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { FaSave, FaTrash } from 'react-icons/fa';

export default ({
  state,
  handleNewQuantity,
  handleQuantityFormChange,
  handleRemoveQuantity,
  formSubmit,
}) => {
  console.log(16, state.activeSizeId);
  const quantities = state.product.productSizes.find(
    (f) => f._id === state.activeSizeId,
  ).quantities;

  return (
    <>
      <Card className="main-content-card">
        <Card.Title>
          <span className="pull-left">Quantities ({quantities.length})</span>
          <Button
            className="pull-right"
            size="sm"
            onClick={() => handleNewQuantity()}
          >
            Add New Quantity
          </Button>
        </Card.Title>
        <Table striped hover size="sm" className="listingTable">
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Status</th>
              <th>Sides</th>
              <th>Price</th>
              <th>Price 2</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quantities.map((m) => (
              <React.Fragment key={m._id}>
                <tr className="listingTable-tr">
                  <td style={{ maxWidth: '6.25rem' }}>
                    <Form.Control
                      size="sm"
                      required
                      name="quantity"
                      value={m.quantity}
                      onChange={(e) => handleQuantityFormChange(e, m._id)}
                    />
                  </td>
                  <td>
                    <Form.Check
                      id={'isActive_' + m._id}
                      type="switch"
                      label={' '}
                      name="isActive"
                      checked={m.isActive}
                      onChange={(e) => handleQuantityFormChange(e, m._id)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      as="select"
                      size="sm"
                      name="sides"
                      value={m.sides}
                      onChange={(e) => handleQuantityFormChange(e, m._id)}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={'_2'}>2 Sided Only</option>
                    </Form.Control>
                  </td>
                  <td style={{ maxWidth: '4.25rem' }}>
                    <Form.Control
                      size="sm"
                      required
                      name="price1"
                      value={m.price1}
                      onChange={(e) => handleQuantityFormChange(e, m._id)}
                    />
                  </td>
                  <td style={{ maxWidth: '4.25rem' }}>
                    <Form.Control
                      size="sm"
                      required
                      name="price2"
                      value={m.price2}
                      onChange={(e) => handleQuantityFormChange(e, m._id)}
                    />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Button size="sm" onClick={(e) => formSubmit(e)}>
                      <FaSave />
                    </Button>
                  </td>
                  <td style={{ textAlign: 'right', width: '2rem' }}>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleRemoveQuantity(m._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};
