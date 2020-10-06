import http from '../../../utils/httpServices';
import * as actions from '../actionTypes';

export const getInvoices = (formObj) => {
  console.log(4, 'action', formObj);
  return async (dispatch) => {
    dispatch({ type: actions.GET_INVOICES_PENDING });
    try {
      const { data } = await http.get(
        `invoices/listing?type=_compCart&page=${formObj.currentPage}&results=${formObj.pageSize}&filter=${formObj.filter}&domain=${formObj.domain}`,
      );
      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      dispatch({ type: actions.GET_INVOICES_SUCCESS, payload: data });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.GET_INVOICES_FAILURE, payload: error });
    }
  };
};

export const getInvoiceById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_INVOICE_BY_ID_PENDING });
    try {
      const { data } = await http.get(`invoices/${id}`);
      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      dispatch({ type: actions.GET_INVOICE_BY_ID_SUCCESS, payload: data });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({ type: actions.GET_INVOICE_BY_ID_FAILURE, payload: error });
    }
  };
};

export const updateInvoiceSegmentById = (formData) => {
  console.clear();
  console.log(41, formData);
  return async (dispatch) => {
    dispatch({
      type: actions.UPDATE_INVOICE_ITEM_SEGMENT_BY_ID_PENDING,
      payload: formData,
    });
    try {
      const { data } = await http.put(
        `invoiceItems/partialUpdate/${formData.id}`,
        {
          ...formData,
        },
      );
      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      data.formData = formData;

      dispatch({
        type: actions.UPDATE_INVOICE_ITEM_SEGMENT_BY_ID_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      console.log(62, error);
      dispatch({
        type: actions.UPDATE_INVOICE_ITEM_SEGMENT_BY_ID_FAILURE,
        payload: error,
      });
    }
  };
};

export const reOrderInvoiceItem = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.RE_ORDER_INVOICE_ITEM_PENDING });
    try {
      const { data } = await http.post(`invoiceItems/reOrder/${formData.id}`, {
        ...formData,
      });
      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      dispatch({
        type: actions.RE_ORDER_INVOICE_ITEM_SUCCESS,
        payload: { data, formData },
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({
        type: actions.RE_ORDER_INVOICE_ITEM_FAILURE,
        payload: error,
      });
    }
  };
};

export const deleteInvoiceItem = (formData) => {
  console.log(formData);
  return async (dispatch) => {
    dispatch({ type: actions.DELETE_INVOICE_ITEM_PENDING });
    try {
      const { data } = await http.delete(
        `invoiceItems/${formData.invoiceId}/${formData.orderId}`,
        {
          ...formData,
        },
      );
      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      dispatch({
        type: actions.DELETE_INVOICE_ITEM_SUCCESS,
        payload: { data, formData },
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({
        type: actions.DELETE_INVOICE_ITEM_FAILURE,
        payload: error,
      });
      return error;
    }
  };
};

export const deleteInvoice = (id) => {
  console.log(128, id);
  return async (dispatch) => {
    dispatch({ type: actions.DELETE_INVOICE_PENDING });
    try {
      const { data } = await http.delete(`invoices/${id}`);
      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      dispatch({
        type: actions.DELETE_INVOICE_SUCCESS,
        payload: { data },
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({
        type: actions.DELETE_INVOICE_FAILURE,
        payload: error,
      });
    }
  };
};

export const invoicePayment = (formData) => {
  console.clear();
  console.table(formData);

  return async (dispatch) => {
    dispatch({ type: actions.INVOICE_PAYMENT_PENDING });

    try {
      const {
        data,
      } = await http.post(
        `paymentProcessing/${formData.paymentGateway}/capture`,
        { ...formData },
      );
      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      console.log(168, 'inv payment', data);

      dispatch({
        type: actions.INVOICE_PAYMENT_SUCCESS,
        payload: data.items,
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({
        type: actions.INVOICE_PAYMENT_FAILURE,
        payload: error,
      });
    }
  };
};

export const updateInvoicePart = (formData) => {
  console.clear();
  console.table(191, formData);

  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_INVOICE_SEGMENT_PENDING });

    try {
      const { data } = await http.put(
        `invoices/segmentUpdate/${formData._id}`,
        {
          ...formData,
        },
      );

      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      dispatch({
        type: actions.UPDATE_INVOICE_SEGMENT_SUCCESS,
        payload: { data, formData },
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({
        type: actions.UPDATE_INVOICE_SEGMENT_FAILURE,
        payload: error,
      });
    }
  };
};

export const orderImageDelete = (formData) => {
  console.clear();
  console.table(191, formData);

  return async (dispatch) => {
    dispatch({ type: actions.ORDER_INVOICE_IMAGE_DELETE_PENDING });

    try {
      const { data } = await http.delete(
        `fileUpload/${formData.orderId}/${formData.imageId}`,
      );

      if (data.error.errorCode !== '0x0') {
        throw data.error;
      }

      dispatch({
        type: actions.ORDER_INVOICE_IMAGE_DELETE_SUCCESS,
        payload: { data, formData },
      });
      return data;
    } catch (error) {
      console.log(34, error);
      dispatch({
        type: actions.ORDER_INVOICE_IMAGE_DELETE_FAILURE,
        payload: error,
      });
    }
  };
};
