import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import uniqid from 'uniqid';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.css';

import menuJson from './sidebar-menu-config.json';
import {
  FaPowerOff,
  FaCopy,
  FaTags,
  FaTachometerAlt,
  FaTruck,
  FaUser,
  FaUsers,
} from 'react-icons/fa';

const Components = {
  FaPowerOff: FaPowerOff,
  FaCopy: FaCopy,
  FaTachometerAlt: FaTachometerAlt,
  FaTags: FaTags,
  FaTruck: FaTruck,
  FaUser: FaUser,
  FaUsers: FaUsers,
};

const openToggle = (e, index, subs) => {
  e.preventDefault();

  if (subs.length < 1) {
    return;
  }

  const li = document.querySelectorAll('.sidebar-left-list > li');
  for (let i = 0; i < li.length; i++) {
    if (i !== index) li[i].classList.remove('open');
  }

  li[index].classList.toggle('open');

  if (li[index].classList.contains('open')) {
    const scrollDiv = document.querySelector(
      '.sidebar-left  div.simplebar-content-wrapper',
    );

    setTimeout(() => {
      scrollDiv.scrollTo({
        top: li[index].offsetTop,
        behavior: 'smooth',
      });
    }, 100);
  }
};

const linkage = () => {
  return;
};

const uriParser = (uri) => {
  return uri.replace('{rand}', uniqid());
};

const TemplateSidebarLeft = (props) => {
  return (
    <div className="sidebar-left" data-test="template-sidebar-left">
      <SimpleBar scrollbarMinSize="250" style={{ height: '100%' }}>
        <ul className="sidebar-left-list">
          {menuJson.map((listItem, index) => (
            <li
              key={index}
              className={
                '/' + window.location.href.split('/')[4] === listItem.uri
                  ? 'open'
                  : ''
              }
            >
              <NavLink
                className={listItem.subs.length > 0 ? 'parent' : 'single'}
                to={'/console' + uriParser(listItem.uri)}
                onClick={(e) =>
                  listItem.subs.length > 0
                    ? openToggle(e, index, listItem.subs)
                    : linkage()
                }
              >
                <i className="react-icon">
                  {React.createElement(Components[listItem.icon])}
                </i>

                <span>{listItem.display}</span>
              </NavLink>
              {listItem.subs.length > 0 && (
                <ul>
                  {listItem.subs.map((sub) => (
                    <li key={sub.uri}>
                      <Link to={'/console' + uriParser(sub.uri)}>
                        {sub.display}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <li className="">
            <Link to="/logout">
              <i className="react-icon">
                {React.createElement(Components['FaPowerOff'])}
              </i>
              <span>Sign Out</span>
            </Link>
          </li>
        </ul>
      </SimpleBar>
    </div>
  );
};

export default TemplateSidebarLeft;
