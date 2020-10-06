import React from 'react';
import config from './paymentForm';

export default ({ paymentForm }) => {
  paymentForm = new paymentForm(config);
  paymentForm.build();

  const requestCardNonce = () => {
    paymentForm.requestCardNonce();
  };

  return (
    <>
      <div id="test"></div>
      <div id="form-container">
        <div id="invoice-id">sssss</div>
        <br />
        <input type="text" id="payment-amount" />
        <div id="sq-card-number"></div>
        <div className="third" id="sq-expiration-date"></div>
        <div className="third" id="sq-cvv"></div>
        <div className="third" id="sq-postal-code"></div>
        <button
          id="sq-creditcard"
          className="button-credit-card"
          onClick={requestCardNonce}
        >
          go go go
        </button>
      </div>
    </>
  );
};

// https://dev.to/wozzo/using-https-with-react-create-app-windows-fn8

//  4111 1111 1111 1111
//  12/22
//  111
//  11111
