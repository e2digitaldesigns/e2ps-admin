import React from 'react';
import { useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';

import { invoiceAmountParser } from '../../../_utils';
import InvoiceHeaderLeft from './invoice-header-left';
import InvoiceHeaderMiddle from './invoice-header-middle';
import InvoiceHeaderRight from './invoice-header-right';

export default () => {
  const invoice = useSelector((state) => state.invoice.invoice);
  if (!invoice) return <div />;

  const invoiceTotals = invoiceAmountParser(invoice);

  return (
    <>
      <Card className="main-content-card">
        <div className="invoice-holder no-btm-border">
          <div className="invoice-bar invoice-bar-left">
            {invoice.invoiceId}
          </div>
          <div className="invoice-bar invoice-bar-middle grid-3">
            <div> {invoiceTotals.date}</div>
            <div className="border-r border-l">
              Total: {invoiceTotals.total}
            </div>
            <div>Due: {invoiceTotals.amountDue}</div>
          </div>
          <div className="invoice-bar invoice-bar-right"></div>
        </div>

        <div className="invoice-holder">
          <div className="invoice-div invoice-div-left">
            <InvoiceHeaderLeft />
          </div>

          <div className="invoice-div invoice-div-middle">
            <InvoiceHeaderMiddle />
          </div>

          <div className="invoice-div invoice-div-right">
            <InvoiceHeaderRight />
          </div>
        </div>
      </Card>
    </>
  );
};
