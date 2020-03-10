import React from "react";
import { useSelector } from "react-redux";

import TitleCell from "./TitleCell";
import PriceCell from "./PriceCell";
import { g2aSelectors } from "@state/ducks/g2a";

const Row = ({ entry }) => {
  const { [entry.id]: entryData } = useSelector(g2aSelectors.entryObj);

  const { open, auctions, meta, details } = entryData;

  const { name: gameTitle = entryData.title } = meta;

  return (
    <tr>
      <TitleCell
        status={meta.status.loading}
        entry={entry}
        open={open}
        title={gameTitle}
        length={Object.keys(auctions).length}
        auctions={auctions}
        details={details}
      />
      <PriceCell status={details.status.loading} entry={entry} />
    </tr>
  );
};

export default Row;
