import React from "react";
import TemplateHeaderLeftNav from "./template-header-left-nav";
import TemplateHeaderRightNav from "./template-header-right-nav";

export default () => {
  return (
    <section className="template-nav-bar" data-test="template-header">
      <TemplateHeaderLeftNav />
      <TemplateHeaderRightNav />
    </section>
  );
};
