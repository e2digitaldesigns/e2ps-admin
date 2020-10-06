import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  FaBars,
  FaDesktop,
  FaExpand,
  FaPowerOff,
  FaRegEnvelope,
  FaRegMoneyBillAlt,
  FaUser,
} from "react-icons/fa";

const handleRightSectionToggle = () => {};
const handleFullScreenToggle = () => {};
const alertNumbers = {};

const TemplateHeaderRightNav = (props) => {
  const account = useSelector((state) => state.account);

  return (
    <>
      <section className="template-right-nav" data-test="template-right-nav">
        <ul>
          <li onClick={handleFullScreenToggle}>
            <i className="react-icon">
              <FaExpand />
            </i>
            <span className="tool-tip">Toggle FullScreen</span>
          </li>
          <li>
            <i className="react-icon">
              <FaRegMoneyBillAlt />
            </i>

            {alertNumbers.quoteRequests > 0 && (
              <span className="notification-number">
                {alertNumbers.quoteRequests}
              </span>
            )}
            <span className="tool-tip">Quote Request</span>
          </li>
          <li>
            <i className="react-icon">
              <FaRegEnvelope />
            </i>
            {alertNumbers.messages > 0 && (
              <span className="notification-number">
                {alertNumbers.messages}
              </span>
            )}
            <span className="tool-tip">Messages</span>
          </li>
          <li>
            <i className="react-icon">
              <FaDesktop />
            </i>

            {alertNumbers.designOrderNote > 0 && (
              <span className="notification-number">
                {alertNumbers.designOrderNote}
              </span>
            )}
            <span className="tool-tip">Design Notes</span>
          </li>
          <li className="display-m staff-options">
            {account.name}
            <ul>
              <li>
                <Link to="/console/myaccount">
                  <i className="react-icon">
                    <FaUser />
                  </i>
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/logout">
                  <i className="react-icon">
                    <FaPowerOff />
                  </i>
                  <span>Sign Out</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="display-m " onClick={handleRightSectionToggle}>
            <i className="react-icon">
              <FaBars />
            </i>
          </li>
        </ul>
      </section>
    </>
  );
};

export default TemplateHeaderRightNav;
