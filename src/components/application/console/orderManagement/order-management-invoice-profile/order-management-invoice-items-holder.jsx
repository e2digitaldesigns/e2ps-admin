import React from 'react';
import { useSelector } from 'react-redux';

import OrderManagerInvoiceItems from './order-management-invoice-items';

export default () => {
  const invoice = useSelector((state) => state.invoice.invoice);

  if (!invoice) return <div />;

  const storeInvoiceItems = invoice.storeInvoiceItems;

  return (
    <>
      {storeInvoiceItems.map((m, index) => (
        <OrderManagerInvoiceItems key={index} orderId={m._id} />
      ))}
    </>
  );
};
