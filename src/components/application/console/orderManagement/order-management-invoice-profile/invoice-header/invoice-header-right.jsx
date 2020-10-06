import React from 'react';
import { useSelector } from 'react-redux';
import { invoiceAmountParser } from '../../../_utils';

export default () => {
  const invoice = useSelector((state) => state.invoice.invoice);
  const invoiceTotals = invoiceAmountParser(invoice);

  const orderStatusMap = {
    _pending: 'Pending',
    _need_files: 'Need Files',
    _sent_to_print: 'Printing',
    _sent_to_design: 'Designing',
    _ready: 'Ready',
    _picked_up: 'Picked Up',
    _shipped: 'Shipped',
    _approved: 'Approved',
    _complete: 'Complete',
  };

  return (
    <>
      <table className="invoice-right-listing-table">
        <tbody>
          <tr>
            <td>Name</td>
            <td className="list-type">Type</td>
            <td className="list-status">Status</td>
            <td className="total-amount">Amount</td>
          </tr>

          {invoice.storeInvoiceItems.map((m, index) => (
            <tr key={index}>
              <td className="list-job-name">
                <a href={`#invoice_item_${m.orderId}`}>
                  {m.item.name === '' ? m.orderId : m.item.name}
                </a>
              </td>
              <td className="list-type">{m.itemType}</td>
              <td className="list-status">{orderStatusMap[m.status]}</td>
              <td className="total-amount">
                {parseFloat(m.item.itemPrice).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="invoice-right-listing-table">
        <tbody>
          <tr className="listing-table-grid-total">
            <td></td>
            <td className="total-label">Sub Total:</td>
            <td className="total-amount">{invoiceTotals.subTotal}</td>
          </tr>

          <tr className="listing-table-grid-total">
            <td></td>
            <td className="total-label">Shipping:</td>
            <td className="total-amount">{invoiceTotals.shippingPrice}</td>
          </tr>

          <tr className="listing-table-grid-total">
            <td></td>
            <td className="total-label">Paid:</td>
            <td className="total-amount">{invoiceTotals.amountPaid}</td>
          </tr>

          <tr className="listing-table-grid-total">
            <td></td>
            <td className="total-label">Due:</td>
            <td className="total-amount">{invoiceTotals.amountDue}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
