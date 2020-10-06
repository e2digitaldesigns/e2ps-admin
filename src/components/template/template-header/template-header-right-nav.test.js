import React from "react";
import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { findByTestAttribute } from "./../../../tddUtils";
import TemplateHeaderRightNav from "./template-header-right-nav";
import accountReducer from "./../../../redux/reducers/account/accountReducer";

import { BrowserRouter } from "react-router-dom";

describe("<Component /> unit test", () => {
  const getWrapper = (
    mockStore = createStore(accountReducer, { account: { name: "Slim Shady" } })
  ) =>
    mount(
      <Provider store={mockStore}>
        <BrowserRouter>
          <TemplateHeaderRightNav />
        </BrowserRouter>
      </Provider>
    );

  it("Should render without errors", () => {
    const wrapper = getWrapper();
    const check = findByTestAttribute(wrapper, "template-right-nav");
    expect(check.length).toBe(1);
  });
});
