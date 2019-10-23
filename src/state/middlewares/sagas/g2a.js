import { all, put, call, takeLatest } from "redux-saga/effects";
import { types, actions, g2aServices } from "state/ducks/g2a";

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
    console.log(error);
  }
}

// 'id', 'search' are required
function* getAuctionList(args) {
  const { id, search } = args;
  yield put(actions.fetchAuctionListStarted(id));
  try {
    const config = {
      params: {
        search
      }
    };
    const data = yield call(g2aServices.getList, config);
    yield put(actions.fetchAuctionListCompleted(id, data));
    if (!data.listings.length) {
      yield put(actions.fetchAuctionCompleted(id));
    } else {
      yield call(getAuction, { ...args, auctionId: data.listings[0].id });
    }
  } catch (error) {
    yield put(actions.fetchAuctionListFailed(error));
  }
}

// 'id', 'auctionId' are required
function* getAuction(args) {
  const { auctionId, id } = args;
  yield put(actions.fetchAuctionStarted(id));
  try {
    const config = {
      params: {
        id: auctionId
      }
    };
    const data = yield call(g2aServices.getAuction, config);
    yield put(actions.fetchAuctionCompleted(id, { ...data, id: auctionId }));
  } catch (error) {
    yield put(actions.fetchAuctionFailed(error));
  }
}
