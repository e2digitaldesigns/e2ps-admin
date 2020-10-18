import React from 'react';
import { useSelector } from 'react-redux';

import TemplateHeader from './../../template/template-header/template-header';
import TemplateSidebarLeft from './../../template/template-sidebar-left/template-sidebar-left';
import TemplateMainContent from './../../template/template-main-content/template-main-content';

// import TemplateSidebarRight from './../../template/template-sidebar-right/template-sidebar-right';

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
        {/* <TemplateSidebarRight /> */}
      </div>
    </>
  );
};
