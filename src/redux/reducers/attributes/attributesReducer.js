import * as actions from "../../actions/actionTypes";

const attributesReducer = (
  state = {
    pending: false,
    listing: [],
    attribute: {},
    error: null,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case actions.GET_ATTRIBUTES_PENDING:
      return {
        ...state,
        pending: true,
        attribute: {},
        error: null,
      };

    case actions.GET_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        listing: payload.result,
        pending: false,
        attribute: payload.attribute,
        error: null,
      };

    case actions.GET_ATTRIBUTES_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.GET_ATTRIBUTES_BY_ID_PENDING:
      return {
        ...state,
        pending: true,
        attribute: {},
        error: null,
      };

    case actions.GET_ATTRIBUTES_BY_ID_SUCCESS:
      return {
        ...state,
        listing: [],
        pending: false,
        attribute: payload.attribute,
        error: null,
      };

    case actions.GET_ATTRIBUTES_BY_ID_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.UPDATE_ATTRIBUTES_SUCCESS:
      return { ...state, pending: false, error: null, attribute: payload };

    case actions.UPDATE_ATTRIBUTES_PENDING:
      return {
        ...state,
        pending: true,
        attribute: {},
        error: null,
      };

    case actions.UPDATE_ATTRIBUTES_FAILURE:
      return { ...state, pending: false, error: payload };

    default:
      return state;
  }
};

export default attributesReducer;
