import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchStaff } from '../../../../redux/actions/staff/staffListingActions';

import StaffManagementListingMain from './staff-management-listing-main';
import ErrorPage from '../_utils/_errors/error';
import LoadingPage from '../_utils/_loading/loading';

export default () => {
  const dispatch = useDispatch();
  const staffListing = useSelector((state) => state.staffListing);
  const [documentState, setDocumentState] = useState({
    docReady: false,
  });

  useEffect(() => {
    let stillHere = true;
    const loadData = async () => {
      try {
        const result = await dispatch(fetchStaff());

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

  if (staffListing.error !== null)
    return <ErrorPage error={staffListing.error} />;

  if (!documentState.docReady) return <LoadingPage />;

  return <StaffManagementListingMain />;
};
