import { combineReducers } from "redux";
import { createReducer, errHandler } from "state/utils";

import * as types from "./types";

const statusReducer = createReducer(false)({
  [types.FETCH_LISTINGS_STARTED]: _ => {
    return { loading: true };
  },
  [types.FETCH_LISTINGS_FAILED]: (_, action) => {
    const { error } = action;
    return { loading: false, error: errHandler(error) };
  },
  [types.FETCH_LISTINGS_COMPLETED]: _ => {
    return { loading: false };
  }
});

const dataReducers = createReducer(null)({
  [types.STORE_GAME_LIST]: (_, action) => {
    return { ...action.payload };
  },
  [types.STORE_UPDATED_GAME_ITEM]: (state, action) => {
    const { payload } = action;

    const newState = {
      ...state,
      [payload.id]: {
        ...payload
      }
    };

    return newState;
  },
  [types.FETCH_AUCTION_LIST_STARTED]: (state, action) => {
    const { id } = action;
    const newState = {
      ...state,
      [id]: {
        ...state[id],
        status: {
          loading: true
        }
      }
    };
    return newState;
  },
  [types.FETCH_AUCTION_LIST_FAILED]: (state, action) => {
    const { id, error } = action;
    const newState = {
      ...state,
      [id]: {
        ...state[id],
        status: {
          loading: false,
          error: errHandler(error)
        }
      }
    };
    return newState;
  },
  [types.FETCH_AUCTION_LIST_COMPLETED]: (state, action) => {
    const { id, payload } = action;
    const newState = {
      ...state,
      [id]: {
        ...state[id],
        listings: payload.listings,
        total: payload.numFound,
        message: payload.message,
        status: {
          loading: false
        }
      }
    };
    return newState;
  },
  [types.FETCH_AUCTION_STARTED]: (state, action) => {
    const { id } = action;

    const newState = {
      ...state,
      [id]: {
        ...state[id],
        auction: {
          status: {
            loading: true
          }
        }
      }
    };

    return newState;
  },
  [types.FETCH_AUCTION_FAILED]: (state, action) => {
    const { id, error } = action;

    const newState = {
      ...state,
      [id]: {
        ...state[id],
        auction: {
          status: {
            loading: false,
            error: errHandler(error)
          }
        }
      }
    };

    return newState;
  },
  [types.FETCH_AUCTION_COMPLETED]: (state, action) => {
    const { id, payload } = action;
    const { listings } = state[id];

    const { name, slug } = listings.find(listing => listing.id === payload.id);
    const newState = {
      ...state,
      [id]: {
        ...state[id],
        auction: {
          ...payload,
          name,
          slug,
          status: {
            loading: false
          }
        }
      }
    };

    return newState;
  },
  [types.ACTION_TOGGLE_EXPAND]: (state, action) => {
    const { id } = action;
    const { open } = state[id].status;

    const newState = {
      ...state,
      [id]: {
        ...state[id],
        status: {
          ...state[id].status,
          open: !open
        }
      }
    };
    return newState;
  }
});

export default combineReducers({
  entries: combineReducers({
    data: dataReducers,
    status: statusReducer
  })
});
