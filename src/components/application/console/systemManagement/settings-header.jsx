import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default ({ section }) => {
  return (
    <>
      <hr />
      <Alert variant="primary">{section}</Alert>
    </>
  );
};
