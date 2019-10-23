import * as types from "./types";

export const fetchPrices = () => ({
  type: types.ACTION_FETCH_PRICES
});

export const fetchPricesStarted = () => ({
  type: types.FETCH_PRICES_STARTED
});

export const fetchPricesCompleted = payload => ({
  type: types.FETCH_PRICES_COMPLETED,
  payload
});

export const fetchPricesFailed = error => ({
  type: types.FETCH_PRICES_FAILED,
  error
});
