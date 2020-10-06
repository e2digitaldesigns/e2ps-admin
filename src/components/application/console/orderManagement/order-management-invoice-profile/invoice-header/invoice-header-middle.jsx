import React from 'react';
import { useSelector } from 'react-redux';
import PaymentOptions from '../paymentOptions/payment-options';

export default () => {
  const invoice = useSelector((state) => state.invoice.invoice);

  return (
    <>
      {' '}
      <div className="customer-info">
        {invoice.customers.contact.companyName}
        <br />
        {invoice.customers.contact.firstName +
          ' ' +
          invoice.customers.contact.lastName}
        <br />
        {invoice.customers.contact.phone}
        <br />
        {invoice.customers.contact.email}
        <br />
        {invoice.customers.contact.address1}
        {invoice.customers.contact.address2 !== '' && (
          <>
            <br />
            {invoice.customers.contact.address2}
          </>
        )}
        <br />
        {invoice.customers.contact.city} {invoice.customers.contact.state},{' '}
        {invoice.customers.contact.zipCode}
      </div>
      <PaymentOptions />
    </>
  );
};
