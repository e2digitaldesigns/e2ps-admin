import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import allReducers from "./../redux/reducers/allReducers";

export const findByTestAttribute = (component, attribute) => {
  const data = component.find(`[data-test='${attribute}']`);
  return data;
};

export const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...[ReduxThunk])(
    createStore
  );
  return createStoreWithMiddleware(allReducers, initialState);
};
