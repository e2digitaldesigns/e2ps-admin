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
    case actions.FETCH_CUSTOMERS_PENDING:
      return { ...state, pending: true, error: null };

    case actions.FETCH_CUSTOMERS_SUCCESS:
      return {
        pending: false,
        dataSet: payload.dataSet,
        paginate: payload.paginate,
        error: null,
      };
    default:
      return theState;
  }
};

export default reducer;
