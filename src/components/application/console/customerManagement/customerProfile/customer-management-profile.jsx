import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PageTemplateHeader } from '../../../../template/template-main-content/template-main-content-assets';
import { fetchCustomerProfile } from '../../../../../redux/actions/customers/customerProfileActions';
// import ErrorPage from '../../_utils/_errors/error';
import LoadingPage from '../../_utils/_loading/loading';
import CustomerManagmentProfileContact from './customer-management-profile-contact';
import Card from 'react-bootstrap/Card';

export default (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.customerProfile);
  const contact = state.dataSet;
  const [documentState, setDocumentState] = useState({ docReady: false });

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const result = await dispatch(
          fetchCustomerProfile(props.match.params.id),
        );

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

  // if (state.error !== null) return <ErrorPage error={state.error} />;

  if (!documentState.docReady) return <LoadingPage />;

  return (
    <>
      <PageTemplateHeader
        displayName={'Client Management'}
        button={{
          text: 'New Client',
          url: '/console/customer-management/new',
        }}
      />

      <Card className="main-content-card">
        <Card.Title>{contact.contact.companyName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {contact.contact.firstName + ' ' + contact.contact.lastName}
        </Card.Subtitle>
      </Card>

      <Card className="main-content-card">
        <CustomerManagmentProfileContact />
      </Card>
    </>
  );
};
