import { combineReducers } from "redux";
import { createReducer, createStatusReducer } from "@state/utils";

import * as types from "./types";

const statusReducer = createStatusReducer({ loading: false })(
  types.FETCH_LISTINGS_STARTED,
  types.FETCH_LISTINGS_FAILED,
  types.FETCH_LISTINGS_COMPLETED
);

const dataReducers = createReducer({})({
  [types.STORE_GAME_LIST]: (state, action) => {
    return {
      ...action.payload
    };
  },
  [types.STORE_UPDATED_GAME_ITEM]: (state, action) => {
    const { id: entryId } = action.payload;

    const newState = {
      ...state,
      [entryId]: {
        ...action.payload
      }
    };

    return newState;
  },
  [types.FETCH_AUCTION_LIST_STARTED]: (state, action) => {
    const entryId = action.payload;
    const newState = {
      ...state,
      [entryId]: {
        ...state[entryId],
        meta: {
          data: {},
          status: {
            loading: true,
            error: null
          }
        }
      }
    };
    return newState;
  },
  [types.FETCH_AUCTION_LIST_FAILED]: (state, action) => {
    const { entryId, error } = action.payload;
    const newState = {
      ...state,
      [entryId]: {
        ...state[entryId],
        meta: {
          data: {},
          status: {
            loading: false,
            error
          }
        }
      }
    };
    return newState;
  },
  [types.FETCH_AUCTION_LIST_COMPLETED]: (state, action) => {
    const { entryId, auctions, message, total } = action.payload;
    const newState = {
      ...state,
      [entryId]: {
        ...state[entryId],
        auctions,
        meta: {
          data: { total, message },
          status: {
            loading: false,
            error: null
          }
        }
      }
    };
    return newState;
  },
  [types.FETCH_AUCTION_STARTED]: (state, action) => {
    const entryId = action.payload;

    const newState = {
      ...state,
      [entryId]: {
        ...state[entryId],
        details: {
          status: {
            loading: true,
            error: null
          }
        }
      }
    };

    return newState;
  },
  [types.FETCH_AUCTION_FAILED]: (state, action) => {
    const { entryId, error } = action.payload;

    const newState = {
      ...state,
      [entryId]: {
        ...state[entryId],
        details: {
          status: {
            loading: false,
            error
          }
        }
      }
    };

    return newState;
  },
  [types.FETCH_AUCTION_COMPLETED]: (state, action) => {
    const { id, entryId, lowest_price } = action.payload;
    const { auctions } = state[entryId];

    if (!id) {
      return {
        ...state,
        [entryId]: {
          ...state[entryId],
          details: {
            data: {},
            status: {
              loading: false,
              error: null
            }
          }
        }
      };
    }

    const { name, slug } = auctions[id];
    const newState = {
      ...state,
      [entryId]: {
        ...state[entryId],
        details: {
          data: {
            id,
            name,
            slug,
            lowest_price
          },
          status: {
            loading: false,
            error: null
          }
        }
      }
    };

    return newState;
  },
  [types.ACTION_TOGGLE_EXPAND]: (state, action) => {
    const entryId = action.payload;
    const { open } = state[entryId];

    const newState = {
      ...state,
      [entryId]: {
        ...state[entryId],
        open: !open
      }
    };
    return newState;
  }
});

const settingReducer = createReducer({})({});

export default combineReducers({
  entries: combineReducers({
    data: dataReducers,
    status: statusReducer
  }),
  settings: settingReducer
});
