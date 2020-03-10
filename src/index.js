import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "@state/store";

import App from "@views/pages/App";

const initialState = {};

const store = configureStore(initialState);

// run Saga
store.runSaga();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

module.hot.accept();
