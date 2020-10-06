import React from 'react';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { invoiceAmountParser, moneyFormatParser } from '../../../../_utils';

export default ({ creditCardState, onPaymentAmountTypeChange }) => {
  const invoice = useSelector((state) => state.invoice.invoice);
  const invoiceTotals = invoiceAmountParser(invoice);

  const labelCol = 4,
    fieldCol = 8;

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
          Apply to
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
              Invoice Balance: ${invoiceTotals.amountDue}
            </option>

            {invoice.storeInvoiceItems.map((m, index) => (
              <option key={m._id} value={index} amount={selectPrice(m)}>
                Order {m.orderId}: {moneyFormatParser(selectPrice(m))}
              </option>
            ))}
            <option value="custom">Different Amount</option>
          </Form.Control>
        </Col>
      </Form.Group>
    </>
  );
};
