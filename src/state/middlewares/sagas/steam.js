import { put, call, takeLatest } from "redux-saga/effects";
import { types, actions, steamServices } from "@state/ducks/steam";
import { errHandler } from "@utils";

export function* watchGetPrices() {
  yield takeLatest(types.ACTION_FETCH_PRICES, getPrices);
}

function* getPrices() {
  yield put(actions.fetchPricesStarted());

  try {
    const data = yield call(steamServices.getPrices);
    yield put(actions.fetchPricesCompleted(data));
  } catch (error) {
    console.error(errHandler(error));
    yield put(actions.fetchPricesFailed(error));
  }
}
