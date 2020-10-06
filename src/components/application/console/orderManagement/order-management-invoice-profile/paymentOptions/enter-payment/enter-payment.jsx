import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';

import {
  invoiceAmountParser,
  moneyFormatParser,
  moneyValidate,
} from './../../../../_utils/';
// import { invoicePayment } from './../../../../../../../redux/actions/invoices/invoiceActions';

export default () => {
  const invoice = useSelector((state) => state.invoice.invoice);
  const invoiceTotals = invoiceAmountParser(invoice);
  const labelCol = 4,
    fieldCol = 8;

  const [paymentState, setPaymentState] = useState({
    paymentType: 'cash',
    paymentAmountType: 'invoice',
    paymentAmount: invoiceTotals.amountDue,
  });

  const onFormChange = (e) => {
    let { name, value } = e.target;

    if (name === 'paymentAmount') {
      value = moneyValidate(value);
    }

    setPaymentState({ ...paymentState, [name]: value });
  };

  const onPaymentAmountTypeChange = (e) => {
    let { name, value } = e.target,
      paymentAmount = 0.0;

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

    setPaymentState({ ...paymentState, [name]: value, paymentAmount });
  };

  const paymentProcess = async () => {
    let maxPaymentAmount = invoiceTotals.amountDue.replace(',', '');
    const paymentData = paymentState;

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
      console.error(91, 'too much');

      toast.error(
        `Payment amount must be more than $2.00 and can not exceed $${maxPaymentAmount}`,
      );
      return;
    }
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
          Type
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            size="sm"
            as="select"
            name="paymentType"
            value={paymentState.paymentType}
            onChange={(e) => onFormChange(e)}
          >
            <option value="_cash">Cash</option>
            <option value="_check">Check</option>
            <option value="_creditCard">Credit Card</option>
            <option value="_other">Other</option>
            <option value="_refund">Refund</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="formGroupRow">
        <Form.Label column="sm" sm={labelCol}>
          Apply to
        </Form.Label>
        <Col sm={fieldCol}>
          <Form.Control
            size="sm"
            name="paymentAmountType"
            as="select"
            value={paymentState.paymentAmountType}
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
            value={paymentState.paymentAmount}
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
