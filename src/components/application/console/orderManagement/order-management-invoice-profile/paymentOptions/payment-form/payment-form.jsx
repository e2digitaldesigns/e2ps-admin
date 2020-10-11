import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';

import {
  invoiceAmountParser,
  moneyFormatParser,
  moneyValidate,
  creditCardValidate,
  numberMaxValidate,
} from './../../../../_utils/';

import { invoicePayment } from './../../../../../../../redux/actions/invoices/invoiceActions';

export default ({ paymentGateway }) => {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice.invoice);
  const invoiceTotals = invoiceAmountParser(invoice);

  const labelCol = 4,
    fieldCol = 8;

  const [creditCardState, setCreditCardState] = useState({
    paymentAmountType: 'invoice',
    paymentAmount: invoiceTotals.amountDue,
    creditCardNumber: '4111 1111 1111 1111',
    creditCardExpiration: '1222',
    creditCardCvv: '886',
    creditCardPostalCode: '54826',
  });

  const onPaymentAmountTypeChange = (e) => {
    let { name, value } = e.target,
      paymentAmount = 0;

    switch (value) {
      case 'invoice':
        paymentAmount = invoiceTotals.amountDue;
        break;

      case 'custom':
        paymentAmount = moneyFormatParser(0);
        break;

      default:
        let m = invoice.storeInvoiceItems[value];
        paymentAmount = moneyFormatParser(
          m.item.itemPrice +
            m.item.shipping.price -
            (m.item.amountPaid + m.item.shipping.amountPaid),
        );
        break;
    }

    setCreditCardState({ ...creditCardState, [name]: value, paymentAmount });
  };

  const onFormChange = (e) => {
    let { name, value } = e.target;

    if (name === 'paymentAmount') {
      value = moneyValidate(value);
    }

    if (name === 'creditCardNumber') {
      value = creditCardValidate(value);
    }

    if (name === 'creditCardExpiration') {
      value = numberMaxValidate(value, 4);
    }

    if (name === 'creditCardCvv') {
      value = numberMaxValidate(value, 3);
    }

    if (name === 'creditCardPostalCode') {
      value = numberMaxValidate(value, 5);
    }

    setCreditCardState({ ...creditCardState, [name]: value });
  };

  const paymentProcess = async () => {
    console.clear();
    let maxPaymentAmount = invoiceTotals.amountDue.replace(',', '');
    const paymentData = _.cloneDeep(creditCardState);

    paymentData.creditCardNumber = paymentData.creditCardNumber.replace(
      / /g,
      '',
    );

    paymentData.paymentAmount = paymentData.paymentAmount.replace(',', '');
    paymentData.invoiceId = invoice._id;
    paymentData.orderId = null;

    if (
      paymentData.paymentAmountType !== 'invoice' &&
      paymentData.paymentAmountType !== 'custom'
    ) {
      const orderItem =
        invoice.storeInvoiceItems[paymentData.paymentAmountType];
      paymentData.orderId = orderItem._id;
      maxPaymentAmount =
        orderItem.item.itemPrice +
        orderItem.item.shipping.price -
        (orderItem.item.amountPaid + orderItem.item.shipping.amountPaid);
    }

    if (parseFloat(paymentData.paymentAmount) > parseFloat(maxPaymentAmount)) {
      console.error(116, 'too much');

      toast.error(
        `Payment amount must be more than $2.00 and can not exceed $${maxPaymentAmount}`,
      );
      return;
    }

    await dispatch(
      invoicePayment({
        ...paymentData,
        paymentGateway,
        customerId: invoice.customers._id,
      }),
    );
  };

  const selectPrice = (m) => {
    const price =
      m.item.itemPrice +
      m.item.shipping.price -
      (m.item.amountPaid + m.item.shipping.amountPaid);

    return price;
  };

  return (
    <>
      <Form.Group as={Row} className="formGroupRow">
        <Form.Label column="sm" sm={labelCol}>
          Apply to XXX
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            size="sm"
            name="paymentAmountType"
            as="select"
            value={creditCardState.paymentAmountType}
            onChange={(e) => onPaymentAmountTypeChange(e)}
          >
            <option value="invoice">
              Invoice Balance: {invoiceTotals.amountDue}
            </option>

            {invoice.storeInvoiceItems.map((m, index) => (
              <option key={m._id} value={index}>
                Order {m.orderId}: {moneyFormatParser(selectPrice(m))}
              </option>
            ))}
            <option value="custom">Different Amount</option>
          </Form.Control>
        </Col>
      </Form.Group>

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

      <Form.Group as={Row} className="formGroupRow">
        <Form.Label column="sm" sm={labelCol}>
          Card
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            size="sm"
            name="creditCardNumber"
            value={creditCardState.creditCardNumber}
            onChange={(e) => onFormChange(e)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="formGroupRow">
        <Form.Label column="sm" sm={labelCol}>
          Exp
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            size="sm"
            name="creditCardExpiration"
            value={creditCardState.creditCardExpiration}
            onChange={(e) => onFormChange(e)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="formGroupRow">
        <Form.Label column="sm" sm={labelCol}>
          CVV
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            size="sm"
            name="creditCardCvv"
            value={creditCardState.creditCardCvv}
            onChange={(e) => onFormChange(e)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="formGroupRow">
        <Form.Label column="sm" sm={labelCol}>
          Postal
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            size="sm"
            name="creditCardPostalCode"
            value={creditCardState.creditCardPostalCode}
            onChange={(e) => onFormChange(e)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            block
            onClick={() => paymentProcess()}
          >
            Submit
          </Button>
        </Col>
      </Form.Group>
    </>
  );
};
