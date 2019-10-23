import React from "react";
import { useSelector } from "react-redux";

import Loader from "components/Loader";
import { steamHelper } from "views/enhancers";
import { steamSelectors } from "state/ducks/steam";

const PriceCell = ({ game }) => {
  const gameData = useSelector(state => state.g2a.entries.data[game.id]);
  const steamPrices = useSelector(steamSelectors.data);

  const { status, listings = [], auction = {} } = gameData;

  const isNoResult = !listings.length;

  const { lowest_price: gamePrice = null } = auction;

  const roundPrice = (price, dex) => {
    return Number(Math.round(`${price}e+${dex}`) + `e-${dex}`);
  };

  const processedPrices = {
    gems: Math.ceil(+gamePrice / (steamHelper.gemPrice(steamPrices) / 1000)),
    tf2: roundPrice(+gamePrice / steamHelper.tf2KeyPrice(steamPrices), 2),
    csgo: roundPrice(+gamePrice / steamHelper.csgoKeyPrice(steamPrices), 2)
  };

  return status && auction.status ? (
    isNoResult ? (
      <td colSpan="4" className="text-center">
        <span>❌ {gameData.message}</span>
      </td>
    ) : (
      <>
        <td className="text-center">{`$${gamePrice}`}</td>
        <td className="text-center">{processedPrices.gems}</td>
        <td className="text-center">{processedPrices.tf2}</td>
        <td className="text-center">{processedPrices.csgo}</td>
      </>
    )
  ) : (
    <td colSpan="4" className="relative text-center">
      <Loader />
    </td>
  );
};

export default PriceCell;
