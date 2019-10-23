import * as types from "./types";

// OPERATION ACTIONS

// payload: gameList{}
export const fetchListings = payload => ({
  type: types.ACTION_FETCH_LISTINGS,
  payload
});

export const toggleExpand = id => ({
  type: types.ACTION_TOGGLE_EXPAND,
  id
});

// ASYNC STATUS ACTIONS

export const fetchListingsStarted = () => ({
  type: types.FETCH_LISTINGS_STARTED
});

export const fetchListingsCompleted = () => ({
  type: types.FETCH_LISTINGS_COMPLETED
});

export const fetchListingsFailed = error => ({
  type: types.FETCH_LISTINGS_FAILED,
  error
});

// state.g2a.gameList[id].status
export const fetchAuctionListStarted = id => ({
  type: types.FETCH_AUCTION_LIST_STARTED,
  id
});

// state.g2a.gameList[id].status
export const fetchAuctionListCompleted = (id, payload) => ({
  type: types.FETCH_AUCTION_LIST_COMPLETED,
  id,
  payload
});

// state.g2a.gameList[id].status
export const fetchAuctionListFailed = (id, error) => ({
  type: types.FETCH_AUCTION_LIST_FAILED,
  id,
  error
});

// state.g2a.gameList[id].action.status
export const fetchAuctionStarted = id => ({
  type: types.FETCH_AUCTION_STARTED,
  id
});

// state.g2a.gameList[id].action.status
export const fetchAuctionCompleted = (id, payload) => ({
  type: types.FETCH_AUCTION_COMPLETED,
  id,
  payload
});

// state.g2a.gameList[id].action.status
export const fetchAuctionFailed = (id, error) => ({
  type: types.FETCH_AUCTION_FAILED,
  id,
  error
});

// STORE STATE DATA ACTIONS

// state.g2a.gameList {}
export const storeGameList = payload => ({
  type: types.STORE_GAME_LIST,
  payload
});

// state.g2a.gameList[id]
export const updateGameItem = payload => ({
  type: types.UPDATE_GAME_ITEM,
  payload
});

// state.g2a.gameList[id]
export const storeUpdatedGameItem = payload => ({
  type: types.STORE_UPDATED_GAME_ITEM,
  payload
});

// state.g2a.gameList[id].auction
export const fetchSelectedAuction = (id, auctionId) => ({
  type: types.FETCH_SELECTED_AUCTION,
  id,
  auctionId
});

export const fetchUpdatedGameItem = payload => ({
  type: types.FETCH_UPDATED_GAME_ITEM,
  payload
});
