import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchStaffProfile } from '../../../../redux/actions/staff/staffProfileActions';
import ErrorPage from '../_utils/_errors/error';
import LoadingPage from '../_utils/_loading/loading';
import StaffProfileMain from '../staffManagement/staff-management-profile-main';

export default (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.staffProfile);
  const [documentState, setDocumentState] = useState({ docReady: false });

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const result = await dispatch(fetchStaffProfile(props.match.params.id));

        if (result.error.errorCode === '0x0') {
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

    loadCustomer();
  }, [dispatch, props.match.params.id]);

  if (state.error !== null) return <ErrorPage error={state.error} />;

  if (!documentState.docReady) return <LoadingPage />;

  return <StaffProfileMain />;
};
