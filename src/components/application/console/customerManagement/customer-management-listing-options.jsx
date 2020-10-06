import React from 'react';
import { Link } from 'react-router-dom';

const CustomerManagmentListingOptions = ({ id }) => {
  return (
    <>
      <div className="listingTable-options">
        <Link to={'/console/customer-management/profile/' + id}>Edit</Link>{' '}
        {' | '}
        <Link to={'/console/customer-management/profile/' + id}>View</Link>
        {/* {' | '}
        <Link to={'/console/customer-management/profile/' + id}>
          Reset Password
        </Link> */}
      </div>
    </>
  );
};

export default CustomerManagmentListingOptions;
