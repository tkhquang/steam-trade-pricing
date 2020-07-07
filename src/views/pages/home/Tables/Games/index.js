import React from "react";
import { useSelector } from "react-redux";
import { g2aSelectors } from "@state/ducks/g2a";
// import { steamSelectors } from "state/ducks/steam";

import Row from "./Row";

const Games = () => {
  const entryArr = useSelector(g2aSelectors.entryArr);

  return (
    <div className="w-4/5 mx-auto mt-10 overflow-auto">
      {entryArr.length > 0 && (
        <table className="w-full mt-2 table-auto">
          <thead className="bg-teal-900">
            <tr>
              <th className="w-1/2 text-center">Title</th>
              <th className="w-1/8 text-center">
                <span className="whitespace-no-wrap">
                  G2A <span>💲</span>
                </span>
              </th>
              <th className="w-1/8 text-center">
                <span className="whitespace-no-wrap">
                  Gems <span>💎</span>
                </span>
              </th>
              <th className="w-1/8 text-center">
                <span className="whitespace-no-wrap">
                  TF2 <span>🔑</span>
                </span>
              </th>
              <th className="w-1/8 text-center">
                <span className="whitespace-no-wrap">
                  CS:GO <span>🔑</span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {entryArr.map(entry => (
              <Row entry={entry} key={entry.id} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Games;
