import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
// import { slideDown, slideUp, slideStop, isVisible } from "slide-anim";
import Square from './sqaure';

export default () => {
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    // sandbox: https://js.squareupsandbox.com/v2/paymentform
    // production: https://js.squareup.com/v2/paymentform

    let sqPaymentScript = document.createElement('script');
    sqPaymentScript.src = 'https://js.squareupsandbox.com/v2/paymentform';
    sqPaymentScript.crossOrigin = 'anonymous';
    sqPaymentScript.type = 'text/javascript';
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      setLoad(true);
    };

    document.getElementsByTagName('head')[0].appendChild(sqPaymentScript);
  });

  const squarePayment = isLoad ? (
    <Square paymentForm={window.SqPaymentForm} />
  ) : null;

  return (
    <>
      <PageTemplateHeader displayName="Help Management" />

      <Card className="main-content-card"></Card>

      <Card className="main-content-card">
        <hr />
        <div>
          <h1>Square</h1>
          {squarePayment}
        </div>
      </Card>
    </>
  );
};
