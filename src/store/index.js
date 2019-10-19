import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
import ReduxThunk from "redux-thunk";

const initialState = {
  steamPrices: null,
  g2aListings: null,
  g2aAuction: null
};

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(ReduxThunk)
);
