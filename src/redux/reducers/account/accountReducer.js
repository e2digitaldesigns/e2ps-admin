const defaultState = {
  pending: false,
  loggedIn: false,
  _id: "",
  name: "",
  permissions: [],
  error: null,
};

const accountReducer = (state = defaultState, action) => {
  let theState = { ...state };
  const { type, payload } = action;

  switch (type) {
    case "ACCOUNT_LOGIN_PENDING":
      return { ...state, pending: true, loggedIn: false, error: null };

    case "ACCOUNT_LOGIN_SUCCESS":
    case "ACCOUNT_LOGGED_IN_REFRESH_TRUE":
      return {
        pending: false,
        loggedIn: true,
        _id: payload._id,
        name: payload.name,
        error: null,
      };

    case "ACCOUNT_LOGIN_FAILURE":
      return { ...state, pending: false, loggedIn: false, error: payload };

    case "ACCOUNT_LOGOUT":
    case "ACCOUNT_LOGGED_IN_REFRESH_FALSE":
      return defaultState;

    default:
      return theState;
  }
};

export default accountReducer;
