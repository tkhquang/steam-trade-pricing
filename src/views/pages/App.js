import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { steamOperations, steamSelectors } from "state/ducks/steam";

import Loader from "views/common/Loader";
import Main from "views/pages/Main";

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
    <div className="pb-10">
      {!steamStatus.loading ? (
        steamStatus.error ? (
          "Error"
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
