import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { reOrderInvoiceItem } from '../../../../../../../redux/actions/invoices/invoiceActions';

export default ({ orderId, invoice }) => {
  const dispatch = useDispatch();
  const storeFrontId = invoice.storeFrontId;
  const system = useSelector((state) => state.system);
  const ext = system.storeFronts.find((f) => f._id === storeFrontId).ext;
  const [reOrderState, setReOrderState] = useState({ sameInvoice: true });

  const reOrderStateChange = (e) => {
    console.log(e.target.value);
    setReOrderState({ sameInvoice: e.target.value });
  };

  const reOrderFormSubmit = async () => {
    // console.clear();
    await dispatch(
      reOrderInvoiceItem({
        id: orderId,
        invoiceId: invoice._id,
        ext,
        invoiceType: invoice.invoiceType,
        sameInvoice: reOrderState.sameInvoice,
      }),
    );
  };

  const labelCol = 4;
  const fieldCol = 8;

  return (
    <span
      id={`reOrder-${orderId}`}
      className={`editMenuClasser editMenuClasser-${orderId}`}
    >
      <li>
        <Form.Group as={Row} className="formGroupRow">
          <Form.Label column="sm" sm={labelCol}>
            Same Invoice:
          </Form.Label>
          <Col sm={fieldCol}>
            <Form.Control
              as="select"
              size="sm"
              value={reOrderState.sameInvoice}
              onChange={(e) => reOrderStateChange(e)}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col>
            <Button
              variant="primary"
              type="submit"
              size="sm"
              onClick={(e) => reOrderFormSubmit()}
              block
            >
              Submit
            </Button>
          </Col>
        </Form.Group>
      </li>
    </span>
  );
};
