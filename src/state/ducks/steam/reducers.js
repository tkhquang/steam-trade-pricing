import { combineReducers } from "redux";
import { createReducer, createStatusReducer } from "@state/utils";

import * as types from "./types";

const dataReducer = createReducer({})({
  [types.FETCH_PRICES_COMPLETED]: (state, { payload }) => ({
    ...state,
    ...payload
  })
});

const steamStatusReducer = createStatusReducer({ loading: true })(
  types.FETCH_PRICES_STARTED,
  types.FETCH_PRICES_FAILED,
  types.FETCH_PRICES_COMPLETED
);

export default combineReducers({
  prices: combineReducers({
    data: dataReducer,
    status: steamStatusReducer
  })
});
