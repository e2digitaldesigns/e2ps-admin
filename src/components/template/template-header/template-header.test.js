import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute } from "./../../../tddUtils";
import TemplateHeader from "./template-header";

const setup = (props = {}) => {
  const component = shallow(<TemplateHeader {...props} />);
  return component;
};

describe("Template Header Component", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttribute(component, "template-header");
    expect(wrapper.length).toBe(1);
  });
});
