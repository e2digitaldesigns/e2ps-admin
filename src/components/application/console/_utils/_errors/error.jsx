import React from 'react';
import { PageTemplateHeader } from '../../../../template/template-main-content/template-main-content-assets';
import Card from 'react-bootstrap/Card';

export default ({ error }) => {
  return (
    <>
      <PageTemplateHeader displayName={'System Error ' + error.errorCode} />

      <Card className="main-content-card">
        Error Code: {error.errorCode}
        <br />
        {error.errorDesc}
      </Card>
    </>
  );
};
