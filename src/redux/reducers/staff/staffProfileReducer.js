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
    case actions.FETCH_STAFF_PROFILE_PENDING:
      return { ...state, pending: true };

    case actions.FETCH_STAFF_PROFILE_SUCCESS:
      return { ...state, pending: false, dataSet: payload.staffer };

    case actions.FETCH_STAFF_PROFILE_FAILURE:
      return { ...state, pending: false, error: payload };

    case actions.UPDATE_STAFF_PROFILE_PENDING:
      return { ...state, pending: true };

    case actions.UPDATE_STAFF_PROFILE_SUCCESS:
      theState.pending = false;

      if (payload.result.nModified === 1) {
      }

      return theState;

    case actions.UPDATE_STAFF_PROFILE_FAILURE:
      return { ...state, pending: false, error: payload };

    default:
      return theState;
  }
};

export default reducer;
