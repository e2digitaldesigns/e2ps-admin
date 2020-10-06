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
    case actions.FETCH_SUPPLIERS_PENDING:
      return { ...state, pending: true, error: null };

    case actions.FETCH_SUPPLIERS_SUCCESS:
      return {
        pending: false,
        dataSet: payload.results,
        error: null,
      };

    case actions.FETCH_SUPPLIERS_FAILURE:
      return { ...state, pending: false, error: payload };
    default:
      return theState;
  }
};

export default reducer;
