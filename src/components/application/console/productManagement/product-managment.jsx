import React from "react";
import { Route, Switch } from "react-router-dom";
import ProductListing from "./products/product-management-listing";
import ProductNew from "./products/product-management-new";
import ProductProfile from "./products/product-management-profile";

import AttributeListing from "./attributes/attribute-management-listing";
import AttributeNew from "./attributes/attribute-management-new";
import AttributeProfile from "./attributes/attribute-management-profile";

// render={(props) => <h1>render 003</h1>}

export default () => {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/console/product-management/products/listing"
          component={ProductListing}
        />

        <Route
          exact
          path="/console/product-management/products/new"
          component={ProductNew}
        />

        <Route
          exact
          path="/console/product-management/product/profile/:id"
          component={ProductProfile}
        />

        <Route
          exact
          path="/console/product-management/attribute/listing"
          component={AttributeListing}
        />

        <Route
          exact
          path="/console/product-management/attribute/new"
          component={AttributeNew}
        />

        <Route
          exact
          path="/console/product-management/attribute/profile/:id"
          component={AttributeProfile}
        />
      </Switch>
    </>
  );
};
