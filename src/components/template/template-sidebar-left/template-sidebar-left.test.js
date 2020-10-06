import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute } from "./../../../tddUtils";
import TemplateSidebarLeft from "./template-sidebar-left";

const setup = (props = {}) => {
  const component = shallow(<TemplateSidebarLeft {...props} />);
  return component;
};

describe("Template Sidebar Left Component", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttribute(component, "template-sidebar-left");
    expect(wrapper.length).toBe(1);
  });
});
