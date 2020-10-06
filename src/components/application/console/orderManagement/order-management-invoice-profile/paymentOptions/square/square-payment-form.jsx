import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';

import { invoiceAmountParser, moneyFormatParser } from './../../../../_utils/';
import { invoicePayment } from './../../../../../../../redux/actions/invoices/invoiceActions';

// import config from './sqaure-payment-config';
import PaymentOrderSelect from '../utils/payment-order-select';

const labelCol = 4,
  fieldCol = 8;

export default ({ paymentForm }) => {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice.invoice);
  const invoiceTotals = invoiceAmountParser(invoice);

  const [creditCardState, setCreditCardState] = useState({
    paymentAmountType: 'invoice',
    paymentAmount: invoiceTotals.amountDue,
    maxPaymentAmount: invoiceTotals.amountDue,
    orderId: 'null',
  });

  const onPaymentAmountTypeChange = (e) => {
    let { name, value } = e.target,
      paymentAmount = 0,
      orderId = 'null';

    console.log(30, name, value);

    let maxPaymentAmount = 0;

    switch (value) {
      case 'invoice':
        paymentAmount = invoiceTotals.amountDue;
        maxPaymentAmount = paymentAmount;
        break;

      case 'custom':
        paymentAmount = moneyFormatParser(0);
        maxPaymentAmount = invoiceTotals.amountDue;
        break;

      default:
        let m = invoice.storeInvoiceItems[value];
        orderId = m._id;
        paymentAmount = moneyFormatParser(
          m.item.itemPrice +
            m.item.shipping.price -
            (m.item.amountPaid + m.item.shipping.amountPaid),
        );
        maxPaymentAmount = paymentAmount;
        break;
    }

    setCreditCardState({
      ...creditCardState,
      [name]: value,
      paymentAmount,
      maxPaymentAmount,
      orderId,
    });
  };

  const onFormChange = (e) => {
    let { name, value } = e.target;
    console.log(30, name, value);
    setCreditCardState({ ...creditCardState, [name]: value });
  };

  return (
    <>
      <div id="form-container">
        <PaymentOrderSelect
          creditCardState={creditCardState}
          onPaymentAmountTypeChange={onPaymentAmountTypeChange}
        />

        <input type="hidden" id="customerId" value={invoice.customers._id} />
        <input type="hidden" id="invoiceId" value={invoice._id} />
        <input type="hidden" id="orderId" value={creditCardState.orderId} />

        <input
          type="hidden"
          id="paymentAmountType"
          value={creditCardState.paymentAmountType}
        />

        <input
          type="hidden"
          id="paymentAmount"
          value={creditCardState.paymentAmount}
        />

        <input
          type="hidden"
          id="maxPaymentAmount"
          value={creditCardState.maxPaymentAmount}
        />

        <Form.Group as={Row} className="formGroupRow">
          <Form.Label column="sm" sm={labelCol}>
            Amount
          </Form.Label>
          <Col sm={fieldCol}>
            <Form.Control
              size="sm"
              name="paymentAmount"
              value={creditCardState.paymentAmount}
              onChange={(e) => onFormChange(e)}
            />
          </Col>
        </Form.Group>

        <SqaureForm paymentForm={paymentForm} dispatch={dispatch} />
      </div>
    </>
  );
};

const SqaureForm = React.memo(({ paymentForm, dispatch }) => {
  console.clear();
  console.log(113, 'SqaureForm');

  // const thePaymentForm = new paymentForm(config);
  const thePaymentForm = new paymentForm({
    applicationId: 'sandbox-sq0idb-Q0Pdj_9u1Fa6nYFvxi2p6g',
    inputClass: 'sq-input',
    autoBuild: false,

    inputStyles: [
      {
        fontSize: '16px',
        lineHeight: '24px',
        padding: '16px',
        placeholderColor: '#a0a0a0',
        backgroundColor: 'transparent',
      },
    ],

    cardNumber: {
      elementId: 'sq-card-number',
      placeholder: 'Card Number',
    },
    cvv: {
      elementId: 'sq-cvv',
      placeholder: 'CVV',
    },
    expirationDate: {
      elementId: 'sq-expiration-date',
      placeholder: 'MM/YY',
    },
    postalCode: {
      elementId: 'sq-postal-code',
      placeholder: 'Postal',
    },

    callbacks: {
      cardNonceResponseReceived: async function (errors, nonce, cardData) {
        if (errors) {
          console.error('Encountered errors:');
          errors.forEach(function (error) {
            console.error('  ' + error.message);
          });
          return;
        }

        const orderId = document.querySelector('#orderId').value;

        const data = await dispatch(
          invoicePayment({
            nonce: nonce,
            paymentAmountType: document.querySelector('#paymentAmountType')
              .value,
            paymentAmount: document.querySelector('#paymentAmount').value,
            invoiceId: document.querySelector('#invoiceId').value,
            orderId: orderId === 'null' ? null : orderId,
            paymentGateway: 'square',
            customerId: document.querySelector('#customerId').value,
          }),
        );

        console.log(32, data);
      },
    },
  });

  thePaymentForm.build();

  const submitPaymentProcess = async () => {
    const maxPaymentAmount = document
      .querySelector('#maxPaymentAmount')
      .value.replace(',', '');
    const paymentAmount = document.querySelector('#paymentAmount').value;

    if (parseFloat(paymentAmount) > parseFloat(maxPaymentAmount)) {
      console.error(203, 'too much');
      toast.error(
        `Payment amount must be more than $2.00 and can not exceed $${maxPaymentAmount}`,
      );
      return;
    }

    await thePaymentForm.requestCardNonce();
  };

  return (
    <>
      <Form.Group as={Row} className="formGroupRow">
        <Form.Label column="sm" sm={labelCol}>
          Card
        </Form.Label>
        <div className="col-sm-8">
          <div
            className="form-control form-control-sm"
            id="sq-card-number"
          ></div>
        </div>
      </Form.Group>

      <Form.Group as={Row} className="formGroupRow">
        <Form.Label column="sm" sm={labelCol}>
          Exp
        </Form.Label>
        <div className="col-sm-8">
          <div
            className="form-control form-control-sm"
            id="sq-expiration-date"
          ></div>
        </div>
      </Form.Group>

      <Form.Group as={Row} className="formGroupRow">
        <Form.Label column="sm" sm={labelCol}>
          CVV
        </Form.Label>
        <div className="col-sm-8">
          <div className="form-control form-control-sm" id="sq-cvv"></div>
        </div>
      </Form.Group>

      <Form.Group as={Row} className="formGroupRow">
        <Form.Label column="sm" sm={labelCol}>
          Postal
        </Form.Label>
        <div className="col-sm-8">
          <div
            className="form-control form-control-sm"
            id="sq-postal-code"
          ></div>
        </div>
      </Form.Group>

      <Form.Group as={Row}>
        <Col>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            block
            onClick={() => submitPaymentProcess()}
          >
            Submit
          </Button>
        </Col>
      </Form.Group>
    </>
  );
});
