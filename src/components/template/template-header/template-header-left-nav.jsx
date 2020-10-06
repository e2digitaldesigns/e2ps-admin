import React from 'react';
import { Link } from 'react-router-dom';
import { handleLeftMenuToggle } from '../../../utils/templateGlobals';

import {
  FaBars,
  FaPlusCircle,
  FaSpinner,
  FaTags,
  FaUser,
} from 'react-icons/fa';

export default () => {
  return (
    <>
      <ul className="template-left-nav" data-test="template-left-nav">
        <li
          className="display-m left-toggle"
          onClick={handleLeftMenuToggle}
          data-test="template-left-nav-toggle"
        >
          <i className="react-icon">
            <FaBars />
          </i>
        </li>
        <li className=" display-m branding">E2 Print Software</li>
        <li>
          <Link to="/console/order-management/listing">
            <i className="react-icon">
              <FaTags />
            </i>
            <span>View Orders</span>
          </Link>
        </li>
        <li>
          <Link to="/console/order-management/new">
            <i className="react-icon">
              <FaPlusCircle />
            </i>
            <span>New Order</span>
          </Link>
        </li>
        <li>
          <Link to="/console/customer-management/new">
            <i className="react-icon">
              <FaUser />
            </i>
            <span>New Client</span>
          </Link>
        </li>
        <li className="loader">
          <i className="react-icon">
            <FaSpinner />
          </i>
        </li>
      </ul>
    </>
  );
};
