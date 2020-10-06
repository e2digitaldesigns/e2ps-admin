import React, { useEffect, useState } from 'react';

import SquarePaymentForm from './square-payment-form';

export default ({ paymentForm }) => {
  const [isSquareLoaded, setIsSquareLoaded] = useState(false);

  useEffect(() => {
    let sqPaymentScript = document.createElement('script');
    sqPaymentScript.src = 'https://js.squareupsandbox.com/v2/paymentform';
    sqPaymentScript.crossOrigin = 'anonymous';
    sqPaymentScript.type = 'text/javascript';
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      setIsSquareLoaded(true);
    };

    document.getElementsByTagName('head')[0].appendChild(sqPaymentScript);
  });

  const squarePayment = isSquareLoaded ? (
    <SquarePaymentForm paymentForm={window.SqPaymentForm} />
  ) : null;

  return (
    <>
      <div>{squarePayment}</div>
    </>
  );
};
