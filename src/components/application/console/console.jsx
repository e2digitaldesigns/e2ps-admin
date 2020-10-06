import React from 'react';
import { useSelector } from 'react-redux';

import TemplateHeader from './../../template/template-header/template-header';
import TemplateSidebarLeft from './../../template/template-sidebar-left/template-sidebar-left';
import TemplateMainContent from './../../template/template-main-content/template-main-content';

export default () => {
  const loggedIn = useSelector((state) => state.account.loggedIn);

  if (!loggedIn) {
    return <div />;
  }

  return (
    <>
      <TemplateHeader />
      <div className="wrapper">
        <TemplateSidebarLeft />
        <TemplateMainContent />
      </div>
    </>
  );
};
