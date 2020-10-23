import { combineReducers } from 'redux';

import accountReducer from './account/accountReducer';

import customerListingReducer from './customers/customerListingReducer';
import customerProfileReducer from './customers/customerProfileReducer';

import systemReducer from './system/systemReducer';
import systemSettingsReducer from './systemSettings/systemSettingsReducer';

import productsReducer from './products/productReducer';
import attributesReducer from './attributes/attributesReducer';

import invoiceReducer from './invoices/invoiceReducer';

import staffListingReducer from './staff/staffListingReducer';
import staffProfileReducer from './staff/staffProfileReducer';

import supplierListingReducer from './suppliers/supplierListingReducer';
import supplierProfileReducer from './suppliers/supplierProfileReducer';

import myProfileReducer from './profile/profileReducer';

const allReducers = combineReducers({
  system: systemReducer,
  myProfile: myProfileReducer,
  account: accountReducer,
  customerListing: customerListingReducer,
  customerProfile: customerProfileReducer,
  products: productsReducer,
  attributes: attributesReducer,
  invoice: invoiceReducer,

  staffListing: staffListingReducer,
  staffProfile: staffProfileReducer,

  supplierListing: supplierListingReducer,
  supplierProfile: supplierProfileReducer,

  systemSettings: systemSettingsReducer,
});

export default allReducers;
