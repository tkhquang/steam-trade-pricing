import React from "react";
import { useSelector } from "react-redux";
import { steamSelectors } from "state/ducks/steam";
import { steamHelper } from "views/enhancers";

const SteamPrices = () => {
  const steamPrices = useSelector(steamSelectors.data);

  const { gems, csgoKey, tf2Key } = steamHelper.getPrices(steamPrices);

  return (
    <div className="w-4/5 text-center flex mx-auto">
      <div className="w-1/2">
        <h2>Current Price</h2>
        <table className="mx-auto">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(steamPrices).map(([id, data]) => (
              <tr key={id}>
                <td>{data.name}</td>
                <td>{`$${data.median_price}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-1/2">
        <h2>Conversion Rate</h2>
        <table className="mx-auto">
          <tbody>
            <tr>
              <td>
                1 CS:GO <span>🔑</span>
              </td>
              <td>
                {Math.ceil(csgoKey / (gems / 1000))} <span>💎</span>
              </td>
            </tr>
            <tr>
              <td>
                1 TF2 <span>🔑</span>
              </td>
              <td>
                {Math.ceil(tf2Key / (gems / 1000))} <span>💎</span>
              </td>
            </tr>
            <tr>
              <td>Phd</td>
              <td>Phd</td>
            </tr>
            <tr>
              <td>Phd</td>
              <td>Phd</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SteamPrices;
