import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchCustomers } from '../../../../redux/actions/customers/customerListingActions';
import CustomerMangementListingMain from './customer-management-main';
import ErrorPage from '../_utils/_errors/error';
import LoadingPage from '../_utils/_loading/loading';

export default () => {
  const dispatch = useDispatch();
  const customerListing = useSelector((state) => state.customerListing);
  const [documentState, setDocumentState] = useState({
    docReady: false,
  });

  useEffect(() => {
    let stillHere = true;
    const loadData = async () => {
      try {
        const result = await dispatch(fetchCustomers());

        if (result.error.errorCode === '0x0' && stillHere) {
          setDocumentState((documentState) => ({
            ...documentState,
            docReady: true,
          }));
        } else {
          throw result;
        }
      } catch (err) {
        toast.error(err.error.errorDesc);
      }
    };

    loadData();
    return () => {
      stillHere = false;
    };
  }, [dispatch]);

  if (customerListing.error !== null)
    return <ErrorPage error={customerListing.error} />;

  if (!documentState.docReady) return <LoadingPage />;

  return <CustomerMangementListingMain />;
};
