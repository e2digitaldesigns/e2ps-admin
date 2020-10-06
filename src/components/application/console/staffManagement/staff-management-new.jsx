import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
import http from './../../../../utils/httpServices';

export default () => {
  const history = useHistory();

  const [state, setState] = useState({
    name: 'me me me',
    email: Math.random().toString(36).substring(2, 8) + '@email.com',
  });

  const formChange = (e) => {
    e.preventDefault();
    console.log(e.target.id, e.target.value);
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    console.clear();

    try {
      const { data } = await http.post('staffers', { ...state });
      if (data.error.errorCode === '0x0') {
        history.push('/console/staff-management/profile/' + data._id);
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTemplateHeader displayName={'Staff Management'} />

      <Card className="main-content-card">
        <Form autoComplete="off" onSubmit={(e) => formSubmit(e)}>
          <Form.Row>
            <Form.Group as={Col} sm={12} md={6} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                size="sm"
                required
                value={state.name}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm={12} md={6} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                size="sm"
                required
                value={state.email}
                onChange={(e) => formChange(e)}
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit" size="sm">
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );
};
