import * as types from "./types";

export const fetchListings = payload => ({
  type: types.ACTION_FETCH_LISTINGS,
  payload
});

export const toggleExpand = payload => ({
  type: types.ACTION_TOGGLE_EXPAND,
  payload
});

export const fetchListingsStarted = () => ({
  type: types.FETCH_LISTINGS_STARTED
});

export const fetchListingsCompleted = () => ({
  type: types.FETCH_LISTINGS_COMPLETED
});

export const fetchListingsFailed = payload => ({
  type: types.FETCH_LISTINGS_FAILED,
  payload
});

export const fetchAuctionListStarted = payload => ({
  type: types.FETCH_AUCTION_LIST_STARTED,
  payload
});

export const fetchAuctionListCompleted = payload => ({
  type: types.FETCH_AUCTION_LIST_COMPLETED,
  payload
});

export const fetchAuctionListFailed = payload => ({
  type: types.FETCH_AUCTION_LIST_FAILED,
  payload
});

export const fetchAuctionStarted = payload => ({
  type: types.FETCH_AUCTION_STARTED,
  payload
});

export const fetchAuctionCompleted = payload => ({
  type: types.FETCH_AUCTION_COMPLETED,
  payload
});

export const fetchAuctionFailed = payload => ({
  type: types.FETCH_AUCTION_FAILED,
  payload
});

export const storeGameList = payload => ({
  type: types.STORE_GAME_LIST,
  payload
});

export const updateGameItem = payload => ({
  type: types.UPDATE_GAME_ITEM,
  payload
});

export const storeUpdatedGameItem = payload => ({
  type: types.STORE_UPDATED_GAME_ITEM,
  payload
});

export const fetchSelectedAuction = payload => ({
  type: types.FETCH_SELECTED_AUCTION,
  payload
});

export const fetchUpdatedGameItem = payload => ({
  type: types.FETCH_UPDATED_GAME_ITEM,
  payload
});
