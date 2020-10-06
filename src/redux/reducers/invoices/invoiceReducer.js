import _ from 'lodash';
import * as actions from '../../actions/actionTypes';

const invoiceReducer = (
  state = {
    pending: false,
    listing: [],
    invoice: {},
    paginate: { totalResults: 0, totalPages: 1, currentPage: 1 },
    orderItemLoaders: {},
    error: null,
  },
  action,
) => {
  const { type, payload } = action;
  const theState = _.cloneDeep(state);
  let orderIndex = -1;

  switch (type) {
    case actions.GET_INVOICES_PENDING:
      return {
        ...state,
        pending: true,
        listing: [],
        invoice: {},
        error: null,
      };

    case actions.GET_INVOICES_SUCCESS:
      console.log(29, payload);
      return {
        ...state,
        pending: false,
        listing: payload.dataSet,
        invoice: {},
        paginate: payload.paginate,
        error: null,
      };

    case actions.GET_INVOICES_FAILURE:
      return {
        ...state,
        pending: false,
        listing: [],
        invoice: {},
        error: payload.error,
      };

    case actions.GET_INVOICE_BY_ID_PENDING:
      return { ...state, pending: true, listing: [], invoice: {}, error: null };

    case actions.GET_INVOICE_BY_ID_SUCCESS:
      return {
        ...state,
        pending: false,
        listing: [],
        invoice: payload.invoice,
        error: null,
      };

    case actions.GET_INVOICE_BY_ID_FAILURE:
      return {
        ...state,
        pending: false,
        listing: [],
        invoice: {},
        error: payload.error,
      };

    case actions.UPDATE_INVOICE_SEGMENT_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case actions.UPDATE_INVOICE_SEGMENT_SUCCESS:
      switch (payload.formData.type) {
        default:
        case 'invoiceTypeChange':
          theState.invoice.invoiceType = payload.formData.invoiceType;
          return theState;
      }

    case actions.UPDATE_INVOICE_SEGMENT_FAILURE:
      return {
        ...state,
        pending: false,
        error: payload.error,
      };

    case actions.UPDATE_INVOICE_ITEM_SEGMENT_BY_ID_PENDING:
      if (!theState.orderItemLoaders[payload.id]) {
        theState.orderItemLoaders[payload.id] = [];
      }

      theState.orderItemLoaders[payload.id].push('a');

      return {
        ...theState,
        pending: true,
        error: null,
      };

    case actions.UPDATE_INVOICE_ITEM_SEGMENT_BY_ID_SUCCESS:
      // console.clear();

      if (theState.orderItemLoaders[payload.formData.id]) {
        theState.orderItemLoaders[payload.formData.id].pop();
      }

      const theOrderIndex = theState.invoice.storeInvoiceItems.findIndex(
        (f) => f._id === payload.formData.id,
      );

      switch (payload.formData.name) {
        case 'status':
          theState.invoice.storeInvoiceItems[theOrderIndex].status =
            payload.formData.value;
          break;

        case 'allowReOrders':
        case 'allowDownloads':
        case 'designManager':
          theState.invoice.storeInvoiceItems[
            theOrderIndex
          ].item.invoiceInformation[payload.formData.name] =
            payload.formData.value;
          break;

        case 'editOrder':
          Object.assign(
            theState.invoice.storeInvoiceItems[theOrderIndex].theItem
              .selections,
            payload.formData.editOrderSelections,
          );

          theState.invoice.storeInvoiceItems[theOrderIndex].item = {
            ...theState.invoice.storeInvoiceItems[theOrderIndex].item,
            itemPrice: parseFloat(payload.formData.itemPrice),
            turnTime: parseFloat(payload.formData.turnTime),
            name: payload.formData.jobName.trim(),
            invoiceNote: payload.formData.invoiceNote,
          };

          break;

        case 'staffNote':
          theState.invoice.storeInvoiceItems[
            theOrderIndex
          ].item.staffNotes.unshift(payload.dataSet.item.staffNotes[0]);
          break;

        case 'updateShippingAddress':
          if (
            payload.formData.shippingProfileState.saveProfile &&
            payload.formData.shippingProfileState.selectedProfileIndex === -1
          ) {
            theState.invoice.customers.shippingProfiles.push({
              _id: payload.dataSet.item.shipping._id,
              profileName: payload.formData.shippingProfileState.profileName,
              type: payload.dataSet.item.shipping.type,
              company: payload.dataSet.item.shipping.company,
              phone: payload.dataSet.item.shipping.phone,
              name: payload.dataSet.item.shipping.name,
              address1: payload.dataSet.item.shipping.address1,
              address2: payload.dataSet.item.shipping.address2,
              city: payload.dataSet.item.shipping.city,
              state: payload.dataSet.item.shipping.state,
              zipCode: payload.dataSet.item.shipping.zipCode,
            });
          }
          theState.invoice.storeInvoiceItems[theOrderIndex].item.shipping = {
            ...theState.invoice.storeInvoiceItems[theOrderIndex].item.shipping,
            type: payload.dataSet.item.shipping.type,
            company: payload.dataSet.item.shipping.company,
            phone: payload.dataSet.item.shipping.phone,
            name: payload.dataSet.item.shipping.name,
            address1: payload.dataSet.item.shipping.address1,
            address2: payload.dataSet.item.shipping.address2,
            city: payload.dataSet.item.shipping.city,
            state: payload.dataSet.item.shipping.state,
            zipCode: payload.dataSet.item.shipping.zipCode,
          };

          return theState;

        case 'updateShippingService':
          theState.invoice.storeInvoiceItems[theOrderIndex].item.shipping = {
            ...theState.invoice.storeInvoiceItems[theOrderIndex].item.shipping,
            service: payload.dataSet.item.shipping.service,
            price: payload.dataSet.item.shipping.price,
            weight: payload.dataSet.item.shipping.weight,
            trackingNumber: payload.dataSet.item.shipping.trackingNumber,
          };

          return theState;

        default:
          break;
      }

      return {
        ...theState,
        pending: false,
        error: null,
      };

    case actions.UPDATE_INVOICE_ITEM_SEGMENT_BY_ID_FAILURE:
      return {
        ...state,
        pending: false,
        error: payload.error,
      };

    case actions.RE_ORDER_INVOICE_ITEM_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case actions.RE_ORDER_INVOICE_ITEM_SUCCESS:
      if (payload.formData.sameInvoice === true) {
        theState.invoice.storeInvoiceItems.push(payload.data.dataSet);
      }
      return theState;

    case actions.RE_ORDER_INVOICE_ITEM_FAILURE:
      return {
        ...state,
        pending: false,
        error: payload.error,
      };

    case actions.DELETE_INVOICE_ITEM_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case actions.DELETE_INVOICE_ITEM_SUCCESS:
      if (payload.data.theReturn === 'invoice') {
        theState.invoice.storeInvoiceItems = theState.invoice.storeInvoiceItems.filter(
          (f) => f._id !== payload.formData.orderId,
        );
      } else {
        // theState.invoice = {};
      }

      return theState;

    case actions.DELETE_INVOICE_ITEM_FAILURE:
      return {
        ...state,
        pending: false,
        error: payload.error,
      };

    case actions.ORDER_INVOICE_IMAGE_UPLOAD_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case actions.ORDER_INVOICE_IMAGE_UPLOAD_SUCCESS:
      orderIndex = theState.invoice.storeInvoiceItems.findIndex(
        (f) => f._id === payload.orderId,
      );

      theState.invoice.storeInvoiceItems[orderIndex].item.images = [];
      theState.invoice.storeInvoiceItems[orderIndex].item.images.push(
        ...payload.images,
      );

      return theState;

    case actions.ORDER_INVOICE_IMAGE_UPLOAD_FAILURE:
      return {
        ...state,
        pending: false,
        error: payload.error,
      };

    case actions.ORDER_INVOICE_IMAGE_DELETE_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case actions.ORDER_INVOICE_IMAGE_DELETE_SUCCESS:
      if (payload.data.dataSet.nModified === 1) {
        orderIndex = theState.invoice.storeInvoiceItems.findIndex(
          (f) => f._id === payload.formData.orderId,
        );

        let imageIndex = theState.invoice.storeInvoiceItems[
          orderIndex
        ].item.images.findIndex((f) => f._id === payload.formData.imageId);

        if (imageIndex > -1)
          theState.invoice.storeInvoiceItems[0].item.images.splice(
            imageIndex,
            1,
          );
      }
      return theState;

    case actions.ORDER_INVOICE_IMAGE_DELETE_FAILURE:
      return {
        ...state,
        pending: false,
        error: payload.error,
      };

    case actions.INVOICE_PAYMENT_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case actions.INVOICE_PAYMENT_SUCCESS:
      console.table(payload);
      let invPaymentIndex;

      for (let i = 0; i < payload.length; i++) {
        invPaymentIndex = theState.invoice.storeInvoiceItems.findIndex(
          (f) => f._id === payload[i]._id,
        );

        theState.invoice.storeInvoiceItems[invPaymentIndex].item.amountPaid =
          payload[i].amountPaid;

        theState.invoice.storeInvoiceItems[
          invPaymentIndex
        ].item.shipping.amountPaid = payload[i].shippingPaid;
      }

      return { ...theState };

    case actions.INVOICE_PAYMENT_FAILURE:
      return {
        ...state,
        pending: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default invoiceReducer;
