import React from "react";
import { connect } from "react-redux";

const TemplateFooter = props => {
  return <h1>Template Footer</h1>;
};

const mapStateToProps = state => {
  const { account } = state;
  return { account };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps())(TemplateFooter);
