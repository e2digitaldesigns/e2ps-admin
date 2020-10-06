import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Button from "react-bootstrap/Button";

export const PageTemplateHeader = ({
  displayName = "Change Me",
  button = {}
}) => {
  return (
    <React.Fragment>
      <div className="page-header">
        <ul className="bread-crumb">
          <li>
            <i className="react-icon">
              <FaHome />
            </i>
          </li>
          <li>{displayName}</li>
        </ul>

        <div className="page-header-info">
          <h3 className="content-title">{displayName}</h3>

          {button.text && button.url && (
            <span className="page-header-button">
              <Link to={button.url}>
                <Button variant="primary" size="sm">
                  {button.text}
                </Button>
              </Link>
            </span>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export const PageTemplateFooter = () => {
  return (
    <React.Fragment>
      <div className="footer-tools">
        <span className="go-top">
          <i className="fa fa-chevron-up" /> Top
        </span>
      </div>
    </React.Fragment>
  );
};
