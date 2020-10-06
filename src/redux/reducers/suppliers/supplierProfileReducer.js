import * as actions from '../../actions/actionTypes';

const reducer = (
  state = {
    pending: false,
    dataSet: {},
    error: null,
  },
  action,
) => {
  let theState = { ...state };
  const { type, payload } = action;

  switch (type) {
    case actions.FETCH_SUPPLIER_PROFILE_PENDING:
      return { ...state, pending: true };

    case actions.FETCH_SUPPLIER_PROFILE_SUCCESS:
      console.log(20, payload);
      return { ...state, pending: false, dataSet: payload.results };

    case actions.FETCH_SUPPLIER_PROFILE_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.UPDATE_SUPPLIER_PROFILE_PENDING:
      return { ...state, pending: true };

    case actions.UPDATE_SUPPLIER_PROFILE_SUCCESS:
      theState.pending = false;

      if (payload.result.nModified === 1) {
      }

      return theState;

    case actions.UPDATE_SUPPLIER_PROFILE_FAILURE:
      return { ...state, pending: false, error: payload };

    default:
      return theState;
  }
};

export default reducer;
