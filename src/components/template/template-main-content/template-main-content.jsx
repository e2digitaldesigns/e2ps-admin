import React from 'react';
import { Route, Switch } from 'react-router-dom';

import OrderManagementNew from '../../application/console/orderManagement/order-management-new/order-management-new';
import OrderManagementListing from '../../application/console/orderManagement/order-management-listing';
import OrderManagementInvoice from '../../application/console/orderManagement/order-management-invoice-profile/order-management-invoice';

import CustomerManagementNew from '../../application/console/customerManagement/customer-management-new';
import CustomerManagementListing from '../../application/console/customerManagement/customer-management-listing';
import CustomerManagementProfile from '../../application/console/customerManagement/customerProfile/customer-management-profile';

import StaffManagementNew from '../../application/console/staffManagement/staff-management-new';
import StaffManagementListing from '../../application/console/staffManagement/staff-management-listing';
import StaffManagementProfile from '../../application/console/staffManagement/staff-management-profile';

import ProductManagement from '../../application/console/productManagement/product-managment';

import SuppliersManagementNew from '../../application/console/suppliersManagement/suppliers-management-new';
import SuppliersManagementListing from '../../application/console/suppliersManagement/suppliers-management-listing';
import SuppliersManagementProfile from '../../application/console/suppliersManagement/suppliers-management-profile';

import SystemSettings from '../../application/console/systemManagement/system-settings';

import Help from '../../application/console/help/help';

export default () => {
  return (
    <>
      <div
        className="main-content-container"
        data-test="template-main-content-container"
      >
        <Switch>
          <Route
            exact
            path="/console/render"
            render={(props) => <h1>render</h1>}
          />

          <Route
            exact
            path="/console/order-management/new/:rand"
            component={OrderManagementNew}
          />

          <Route
            exact
            path="/console/order-management/new/:type/:id"
            component={OrderManagementNew}
          />

          <Route
            exact
            path="/console/order-management/listing/:rand"
            component={OrderManagementListing}
          />

          <Route
            exact
            path="/console/order-management/invoice/:id"
            component={OrderManagementInvoice}
          />

          <Route
            exact
            path="/console/customer-management/listing/:rand"
            component={CustomerManagementListing}
          />

          <Route
            exact
            path="/console/customer-management/new/:rand"
            component={CustomerManagementNew}
          />

          <Route
            exact
            path="/console/customer-management/profile/:id"
            component={CustomerManagementProfile}
          />

          <Route
            exact
            path="/console/staff-management/listing"
            component={StaffManagementListing}
          />

          <Route
            exact
            path="/console/staff-management/new"
            component={StaffManagementNew}
          />

          <Route
            exact
            path="/console/staff-management/profile/:id"
            component={StaffManagementProfile}
          />

          <Route
            path="/console/product-management"
            component={ProductManagement}
          />

          <Route
            path="/console/suppliers-management/listing"
            component={SuppliersManagementListing}
          />

          <Route
            path="/console/suppliers-management/new"
            component={SuppliersManagementNew}
          />

          <Route
            exact
            path="/console/suppliers-management/profile/:id"
            component={SuppliersManagementProfile}
          />

          <Route
            exact
            path="/console/system-settings"
            component={SystemSettings}
          />

          <Route exact path="/console/help" component={Help} />
        </Switch>
      </div>
    </>
  );
};
