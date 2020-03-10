import React from "react";
import { useSelector } from "react-redux";

import Loader from "@views/common/Loader";
import { steamHelper } from "@views/enhancers";
import { steamSelectors } from "@state/ducks/steam";
import { g2aSelectors } from "@state/ducks/g2a";

const PriceCell = ({ entry, status }) => {
  const { [entry.id]: entryData } = useSelector(g2aSelectors.entryObj);
  const steamPrices = useSelector(steamSelectors.data);

  const { meta, details } = entryData;

  const { lowest_price: gamePrice = null } = details.data || {};

  const roundPrice = (price, dex) => {
    return Number(Math.round(`${price}e+${dex}`) + `e-${dex}`);
  };

  const processedPrices = {
    gems: Math.ceil(+gamePrice / (steamHelper.gemPrice(steamPrices) / 1000)),
    tf2: roundPrice(+gamePrice / steamHelper.tf2KeyPrice(steamPrices), 2),
    csgo: roundPrice(+gamePrice / steamHelper.csgoKeyPrice(steamPrices), 2)
  };

  return !status ? (
    !details?.data?.lowest_price ? (
      <td colSpan="4" className="text-center">
        <span>❌ {meta?.data?.message}</span>
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
