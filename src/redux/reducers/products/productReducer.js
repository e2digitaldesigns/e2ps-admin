import * as actions from '../../actions/actionTypes';
import _ from 'lodash';

const productReducer = (
  state = {
    pending: false,
    listing: [],
    product: {},
    productSizes: [],
    productQuantities: [],
    error: null,
  },
  action,
) => {
  const { type, payload } = action;
  const theState = _.cloneDeep(state);

  switch (type) {
    case actions.FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        pending: true,
        product: {},
        productSizes: [],
        productQuantities: [],
        error: null,
      };

    case actions.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        pending: false,
        listing: payload.dataSet,
        error: null,
      };

    case actions.FETCH_PRODUCTS_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.FETCH_PRODUCT_BY_ID_PENDING:
      return { ...state, pending: true, error: null };

    case actions.FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        products: [],
        pending: false,
        product: payload.product,
        productSizes: payload.productSizes,
        productQuantities: payload.productQuantities,
        error: null,
      };

    case actions.FETCH_PRODUCT_BY_ID_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.UPDATE_PRODUCT_PENDING:
      return { ...state, pending: true, error: null };

    case actions.UPDATE_PRODUCT_SUCCESS:
      return { ...state, pending: false, product: payload, error: null };

    case actions.UPDATE_PRODUCT_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.DELETE_PRODUCT_PENDING:
      return { ...state, pending: true, error: null };

    case actions.DELETE_PRODUCT_SUCCESS:
      return state;

    case actions.DELETE_PRODUCT_FAILURE:
      return { ...state, pending: false, error: payload };

    ////////////////////////////////////////////////
    //  PRODUCT SIZES  /////////////////////////////
    ////////////////////////////////////////////////

    case actions.CREATE_PRODUCT_SIZE_PENDING:
      return { ...state, pending: true, error: null };

    case actions.CREATE_PRODUCT_SIZE_SUCCESS:
      const productCreateSizes = state.productSizes;
      productCreateSizes.push({ ...payload.result });
      return {
        ...state,
        pending: false,
        productSizes: productCreateSizes,
        error: null,
      };

    case actions.CREATE_PRODUCT_SIZE_FAILURE:
      return { ...state, pending: false, error: payload };

    //UPDATE
    case actions.UPDATE_PRODUCT_SIZE_PENDING:
      return { ...state, pending: true, error: null };

    case actions.UPDATE_PRODUCT_SIZE_SUCCESS:
      const productUpdateSizes = state.productSizes;
      const index = productUpdateSizes.findIndex((f) => f._id === payload._id);

      productUpdateSizes[index] = payload;
      return {
        ...state,
        pending: false,
        productSizes: productUpdateSizes,
        error: null,
      };

    case actions.UPDATE_PRODUCT_SIZE_FAILURE:
      return { ...state, pending: false, error: payload };

    //DELETE
    case actions.DELETE_PRODUCT_SIZE_PENDING:
      return { ...state, pending: true, error: null };

    case actions.DELETE_PRODUCT_SIZE_SUCCESS:
      const productDeleteSizes = state.productSizes.filter(
        (f) => f._id !== payload,
      );

      console.log(92, productDeleteSizes.length, productDeleteSizes);

      return {
        ...state,
        pending: false,
        productSizes: productDeleteSizes,
        error: null,
      };

    case actions.DELETE_PRODUCT_SIZE_FAILURE:
      return { ...state, pending: false, error: payload };

    ////////////////////////////////////////////////
    //  PRODUCT QUANTITIES  ////////////////////////
    ////////////////////////////////////////////////
    case actions.CREATE_PRODUCT_QUANTITY_PENDING:
      return { ...state, pending: true, error: null };

    case actions.CREATE_PRODUCT_QUANTITY_SUCCESS:
      const productCreateQuantities = state.productQuantities;
      delete payload.result.date;
      delete payload.result.__v;
      productCreateQuantities.push({ ...payload.result });

      return {
        ...state,
        pending: false,
        productQuantities: productCreateQuantities,
        error: null,
      };

    case actions.CREATE_PRODUCT_QUANTITY_FAILURE:
      return { ...state, pending: false, error: payload };

    //UPDATE
    case actions.UPDATE_PRODUCT_QUANTITY_PENDING:
      return { ...state, pending: true, error: null };

    case actions.UPDATE_PRODUCT_QUANTITY_SUCCESS:
      const productUpdateQuantities = state.productQuantities;
      const productUpdateQuantitiesIndex = productUpdateQuantities.findIndex(
        (f) => f._id === payload._id,
      );

      productUpdateQuantities[productUpdateQuantitiesIndex] = payload;
      return {
        ...state,
        pending: false,
        productQuantities: productUpdateQuantities,
        error: null,
      };

    case actions.UPDATE_PRODUCT_QUANTITY_FAILURE:
      return { ...state, pending: false, error: payload };

    //DELETE
    case actions.DELETE_PRODUCT_QUANTITY_PENDING:
      return { ...state, pending: true, error: null };

    case actions.DELETE_PRODUCT_QUANTITY_SUCCESS:
      const productDeleteQuantities = state.productQuantities.filter(
        (f) => f._id !== payload,
      );

      return {
        ...state,
        pending: false,
        productQuantities: productDeleteQuantities,
        error: null,
      };

    case actions.DELETE_PRODUCT_QUANTITY_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.PRODUCT_IMAGE_UPLOAD_PENDING:
      return { ...state, pending: true, error: null };

    case actions.PRODUCT_IMAGE_UPLOAD_SUCCESS:
      console.log(199, payload);
      theState.product.images = payload.images;
      return { ...theState, pending: false };

    case actions.PRODUCT_IMAGE_UPLOAD_FAILURE:
      return { ...state, pending: false, error: payload };

    default:
      return state;
  }
};

export default productReducer;
