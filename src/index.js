import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store/store';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./scss/custom.scss";
import './scss/styles.scss';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
