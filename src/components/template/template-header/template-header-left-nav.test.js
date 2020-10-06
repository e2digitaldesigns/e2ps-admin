import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute } from "./../../../tddUtils";
import TemplateHeaderLeftNav from "./template-header-left-nav";

const setup = (props = {}) => {
  const component = shallow(<TemplateHeaderLeftNav {...props} />);
  return component;
};

describe("Template Header Left Navigation Component", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttribute(component, "template-left-nav");
    expect(wrapper.length).toBe(1);
  });
});
