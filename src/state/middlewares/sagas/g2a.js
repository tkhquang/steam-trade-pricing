import { all, put, call, takeLatest } from "redux-saga/effects";

import { types, actions, g2aServices } from "@state/ducks/g2a";
import { errHandler } from "@utils";

export function* watchGetListings() {
  yield takeLatest(types.ACTION_FETCH_LISTINGS, getListings);
  yield takeLatest(types.FETCH_UPDATED_GAME_ITEM, getUpdatedListing);
  yield takeLatest(types.FETCH_SELECTED_AUCTION, getAuction);
}

function* getListings(args) {
  const { payload: gameListObj } = args;
  try {
    yield put(actions.fetchListingsStarted());
    yield put(actions.storeGameList(gameListObj));
    const promises = Object.values(gameListObj).map(item =>
      call(getAuctionList, item)
    );
    yield all(promises);
    yield put(actions.fetchListingsCompleted());
  } catch (error) {
    console.error(errHandler(error));
    yield put(actions.fetchListingsFailed(error));
  }
}

function* getUpdatedListing(args) {
  const { payload } = args;
  try {
    yield put(actions.storeUpdatedGameItem(payload));
    yield put(actions.updateGameItem(payload));
    yield call(getAuctionList, payload);
  } catch (error) {
    console.error(errHandler(error));
  }
}

// 'id', 'search' are required
function* getAuctionList(args) {
  const { id: entryId, search } = args;
  yield put(actions.fetchAuctionListStarted(entryId));

  try {
    const { total, auctions, message } = yield call(
      g2aServices.getList,
      search
    );

    Object.keys(auctions).forEach(id => {
      auctions[id] = {
        ...auctions[id],
        entryId
      };
    });

    const data = {
      total,
      auctions,
      message
    };

    yield put(actions.fetchAuctionListCompleted({ ...data, entryId }));

    if (!Object.values(data.auctions).length) {
      yield put(actions.fetchAuctionCompleted({ entryId }));
    } else {
      const payload = {
        entryId,
        id: Object.values(data.auctions)[0].id
      };
      yield call(getAuction, { payload });
    }
  } catch (error) {
    console.error(errHandler(error));
    yield put(actions.fetchAuctionListFailed({ entryId, error }));
  }
}

// 'entryId', 'id' are required
function* getAuction(args) {
  const { payload } = args;
  const { id: auctionId, entryId } = payload;
  yield put(actions.fetchAuctionStarted(entryId));
  try {
    const data = yield call(g2aServices.getAuction, auctionId);
    const payload = {
      id: auctionId,
      entryId,
      lowest_price: data.lowest_price
    };
    yield put(actions.fetchAuctionCompleted(payload));
  } catch (error) {
    console.error(errHandler(error));
    yield put(actions.fetchAuctionFailed({ entryId, error }));
  }
}
