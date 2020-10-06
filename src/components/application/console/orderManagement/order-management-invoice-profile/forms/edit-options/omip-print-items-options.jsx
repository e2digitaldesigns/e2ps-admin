import React from 'react';
import Form from 'react-bootstrap/Form';
import OptionLink from './option-link';
import { moneyFormatParser } from './../../../../_utils';

export default ({
  orderId,
  menuState,
  menuToggle,
  invoiceInformation,
  assets,
  editOrderSegments,
}) => {
  return (
    <>
      <li>
        <Form.Check
          id={`${orderId}_allowReOrders`}
          name={'allowReOrders'}
          type="switch"
          label={'Allow ReOrders'}
          checked={invoiceInformation.allowReOrders}
          onChange={(e) => editOrderSegments(e)}
        />
      </li>

      <li>
        <span className="invoice-label">Supplier:</span> n/a <br />
        <span className="invoice-label">Sent to Print Date:</span> n/a
      </li>
      <li>
        <span className="invoice-label">Ship/Pick Up:</span>{' '}
        {assets.item.shipping.service} <br />
        <span className="invoice-label">Price:</span>{' '}
        {moneyFormatParser(assets.item.shipping.price)} <br />
        <span className="invoice-label">Tracking Number:</span>{' '}
        {assets.item.shipping.trackingNumber.trim() === ''
          ? 'Not Available'
          : assets.item.shipping.trackingNumber}
        <br />
        <span className="invoice-label">Shipping Weight:</span>{' '}
        {assets.item.shipping.weight.toFixed(2)}
      </li>

      <li>
        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="editMenu"
          display="Edit Order"
        />

        <span> | </span>

        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="staffNotes"
          display="Staff Notes"
          count={assets.item.staffNotes.length}
        />

        {/* <span> | </span>

        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="supplier"
          display="Supplier"
        /> */}
      </li>

      <li>
        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="shipping"
          display="Shipping"
        />

        <span> | </span>

        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="imageLinks"
          display="Image Links"
          count={assets.item.imageLinks.length}
        />

        <span> | </span>

        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="reOrder"
          display="Re-Order"
        />
      </li>
    </>
  );
};
