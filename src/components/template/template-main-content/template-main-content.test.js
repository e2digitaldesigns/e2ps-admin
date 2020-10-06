import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute } from "./../../../tddUtils";
import TemplateMainContent from "./template-main-content";

const setup = (props = {}) => {
  const component = shallow(<TemplateMainContent {...props} />);
  return component;
};

describe("Template Main Content Component", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttribute(
      component,
      "template-main-content-container"
    );
    expect(wrapper.length).toBe(1);
  });
});
