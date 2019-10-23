import React from "react";
import { useSelector } from "react-redux";

import TitleCell from "./TitleCell";
import PriceCell from "./PriceCell";

const Row = ({ game }) => {
  const gameData = useSelector(state => state.g2a.entries.data[game.id]);

  const { status, listings = [], auction = {} } = gameData;

  const { open } = status;

  const { name: gameTitle = game.title } = auction;

  return (
    <tr>
      <TitleCell
        status={status && auction.status}
        game={game}
        open={open}
        title={gameTitle}
        length={listings.length}
        listings={listings}
        auction={auction}
      />
      <PriceCell game={game} />
    </tr>
  );
};

export default Row;
