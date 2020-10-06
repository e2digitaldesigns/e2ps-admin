import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateInvoicePart } from '../../../../../../redux/actions/invoices/invoiceActions';
//deleteInvoice,

export default () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const invoice = useSelector((state) => state.invoice.invoice);

  const [invoiceState, setInvoiceState] = useState({
    invoiceType: invoice.invoiceType,
  });

  const invoiceTypeChange = async (e) => {
    const invoiceType = e.target.value;

    try {
      const result = await dispatch(
        updateInvoicePart({
          _id: invoice._id,
          type: 'invoiceTypeChange',
          invoiceType,
        }),
      );

      if (result.error.errorCode === '0x0') {
        setInvoiceState({ ...invoiceState, invoiceType });
      }
    } catch (error) {
      console.error(32, error);
    }
  };

  // const handleDeleteInvoice = async () => {
  //   console.log(24, invoice._id);

  //   return;

  //   try {
  //     const result = await dispatch(deleteInvoice(invoice._id));
  //     if (result.error.errorCode === '0x0') {
  //       history.replace(`/console/order-management/listing`);
  //     }
  //   } catch (error) {
  //     console.log(32, error);
  //   }
  // };

  return (
    <>
      <ul className="invoice-list-ul">
        <li>
          <select
            className="invoice-selects"
            value={invoiceState.invoiceType}
            onChange={(e) => invoiceTypeChange(e)}
          >
            <option value="_shoppingCart">Shopping Cart</option>
            <option value="_quoteRequest">Quote Request</option>
            <option value="_estimate">Estimate</option>
            <option value="_compCart">Comp Cart</option>
          </select>
        </li>
        <li>
          <Link to={`/console/order-management/new/inv/${invoice._id}`}>
            Add Item to Invoice
          </Link>
        </li>
        <li>
          <Link
            to={`/console/order-management/new/ctm/${invoice.customers._id}`}
          >
            Create New Order
          </Link>
        </li>
        <li>
          <Link
            to={`/console/customer-management/profile/${invoice.customers._id}`}
          >
            Client Profile Page
          </Link>
        </li>
        {/* <li>Reset User Password</li> */}
        {/* <li>
          <span onClick={() => handleDeleteInvoice()}>Delete Invoice</span>
        </li> */}
      </ul>
    </>
  );
};
