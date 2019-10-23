import React from "react";
import ReactDOM from "react-dom";
import configureStore from "state/store";
import { Provider } from "react-redux";

import App from "views/pages/App";

const initialState = {
  steam: {
    prices: {
      status: {
        loading: true
      },
      data: {}
    }
  },
  g2a: {
    entries: {
      data: {},
      status: {
        loading: false
      }
    }
  }
};

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
