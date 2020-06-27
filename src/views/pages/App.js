import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { steamOperations, steamSelectors } from "@state/ducks/steam";

import Loader from "@views/common/Loader";
import Main from "@views/pages/Main";

import "styles/index.css";

const App = () => {
  const steamStatus = useSelector(steamSelectors.status);
  const dispatch = useDispatch();

  const getSteamPrices = useCallback(() => {
    return dispatch(steamOperations.fetchPrices());
  }, [dispatch]);

  useEffect(() => {
    getSteamPrices();
  }, [getSteamPrices]);

  return (
    <div className="min-h-screen">
      {!steamStatus.loading ? (
        steamStatus.error ? (
          <div className="flex min-h-screen w-full items-center justify-center">
            {steamStatus.error.message}
          </div>
        ) : (
          <Main />
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default App;
