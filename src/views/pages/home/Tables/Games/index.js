import React from "react";
import { useSelector } from "react-redux";
import { g2aSelectors } from "@state/ducks/g2a";
// import { steamSelectors } from "state/ducks/steam";

import Row from "./Row";

const Games = () => {
  const entryArr = useSelector(g2aSelectors.entryArr);
  // const entryObj = useSelector(g2aSelectors.entryObj);
  // const entryStatus = useSelector(g2aSelectors.entryStatus);
  // const steamPrices = useSelector(steamSelectors.data);

  // const mappedData = {
  //   data: entryArr.map(entry => {
  //     return {
  //       entry: {
  //         id: entry.id,
  //         title: entry.title,
  //         search: entry.search,
  //         status: entryStatus,
  //         total: entry.total | 0,
  //         message: entry.message | ""
  //       },
  //       auctionList: {
  //         status: entry.status,
  //         data: !entry.status.loading ? [...entry.listings] : []
  //       },
  //       auction: {
  //         status: entry.auction ? entry.auction.status : { loading: true },
  //         data: { ...entry.auction }
  //       }
  //       // prices, // g2a, gems, csgo, tf2
  //     };
  //   })
  // };

  // console.log({ mappedData });

  // const newArr = [...entryArr].sort((a, b) => {
  //   const { name: keyA = "" } = a.auction || { name: "" };
  //   const { name: keyB = "" } = b.auction || { name: "" };
  //   if (keyA < keyB) return -1;
  //   if (keyA > keyB) return 1;
  //   return 0;
  // });
  return (
    <div className="w-4/5 mx-auto mt-10">
      {entryArr.length > 0 && (
        <table className="w-full mt-2">
          <thead className="bg-teal-900">
            <tr>
              <th className="w-1/2 text-center">Title</th>
              <th className="w-1/8 text-center">
                G2A <span>💲</span>
              </th>
              <th className="w-1/8 text-center">
                Gems <span>💎</span>
              </th>
              <th className="w-1/8 text-center">
                TF2 <span>🔑</span>
              </th>
              <th className="w-1/8 text-center">
                CS:GO <span>🔑</span>
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
