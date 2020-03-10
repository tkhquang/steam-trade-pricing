import { all } from "redux-saga/effects";

import * as steam from "./steam";
import * as g2a from "./g2a";

export default function* root() {
  yield all([steam.watchGetPrices(), g2a.watchGetListings()]);
}
