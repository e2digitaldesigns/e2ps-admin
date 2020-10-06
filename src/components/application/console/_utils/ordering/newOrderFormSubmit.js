import _ from 'lodash';

export default (
  productState,
  orderState,
  invoiceState,
  starterState,
  customerState,
) => {
  const theProductState = _.cloneDeep(productState);
  const theProduct = theProductState.listing.find(
    (f) => f._id === theProductState.activeProductId,
  );

  delete theProductState.listing;
  delete theProductState.activeProductId;

  const theOrderState = orderState;
  delete theOrderState.attributePrice;
  delete theOrderState.basePrice;

  const invoiceObj = {
    storeFrontId: invoiceState.storeFrontId,
    invoiceId: invoiceState.invoiceId,
    customerId: customerState._id,
    invoiceType: invoiceState.invoiceType,
  };

  const itemObj = {
    storeFrontId: invoiceState.storeFrontId,
    invoiceId: starterState.addToInvoice
      ? starterState.invoiceId
      : 'set me in rest',
    customerId: customerState._id,
    orderItem: { itemType: productState.itemType, ...theOrderState },
    theItem: {
      _id: theProduct._id,
      displayName: theProduct.displayName,
      productSizes: theProduct.productSizes,
      attributes: theProduct.attributes,
      selections: { ...theProductState },
    },
  };

  if (productState.itemType === 'design') {
    delete itemObj.theItem.attributes;
    delete itemObj.theItem.selections.selectedAttributes;
  }

  const reqObj = {
    addToInvoice: starterState.addToInvoice,
    addToInvoiceId: starterState.invoiceId,
    invoiceObj,
    itemObj,
  };

  return reqObj;
};
