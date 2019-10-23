import { combineReducers } from "redux";
import { createReducer, errHandler } from "state/utils";

import * as types from "./types";

const statusReducer = createReducer(null)({
  [types.FETCH_PRICES_STARTED]: _ => ({
    loading: true
  }),
  [types.FETCH_PRICES_FAILED]: (_, { error }) => ({
    loading: false,
    error: errHandler(error)
  }),
  [types.FETCH_PRICES_COMPLETED]: _ => ({
    loading: false
  })
});

const dataReducer = createReducer(null)({
  [types.FETCH_PRICES_STARTED]: () => ({}),
  [types.FETCH_PRICES_COMPLETED]: (_, { payload }) => ({
    ...payload
  })
});

export default combineReducers({
  prices: combineReducers({
    data: dataReducer,
    status: statusReducer
  })
});
