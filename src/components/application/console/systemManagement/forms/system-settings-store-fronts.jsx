import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

export default () => {
  const systemSettings = useSelector(
    (state) => state.systemSettings.storeFronts,
  );

  const [storefrontState] = useState([...systemSettings]);

  return (
    <>
      <Card className="main-content-card">
        <Card.Title>
          <span>Storefronts</span>
        </Card.Title>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Domain</th>
              <th>Default</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {storefrontState.map((m, index) => (
              <tr key={m._id}>
                <td>
                  Name: {m.name}
                  <br />
                  Domain: {m.domain}
                  <br />
                  Ext: {m.ext}
                </td>
                <td>{m.defaultStore ? 'Yes' : 'No'}</td>
                <td>{m.isActive ? 'Active' : 'InActive'}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Form.Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Button variant="primary" size="sm">
              Submit
            </Button>
          </Form.Group>
        </Form.Row>
      </Card>
    </>
  );
};
