import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { PageTemplateHeader } from '../../../../template/template-main-content/template-main-content-assets';
import OrderManagerInvoiceHeader from './invoice-header/invoice-header';
import OrderManagerInvoiceItemsHolder from './order-management-invoice-items-holder';

import { getInvoiceById } from '../../../../../redux/actions/invoices/invoiceActions';

export default (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ dataLoaded: false });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await dispatch(getInvoiceById(props.match.params.id));
        if (data.error.errorCode === '0x0') {
          setState({ dataLoaded: true });
        }
      } catch (err) {
        console.log(21, 'invoice ', err);
      }
    }

    fetchData();
  }, [props.match.params.id, dispatch]);

  if (!state.dataLoaded) {
    return (
      <>
        <div />
      </>
    );
  }

  return (
    <>
      <PageTemplateHeader
        displayName="Order Management"
        button={{
          text: 'New Order',
          url: '/console/order-management/new',
        }}
      />

      <OrderManagerInvoiceHeader />

      <OrderManagerInvoiceItemsHolder />
    </>
  );
};
