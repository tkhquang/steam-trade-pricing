import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getSteamPrices } from "../actions";

const ItemPrices = ({ getSteamPrices, steamPrices }) => {
  useEffect(() => {
    getSteamPrices();
  }, [getSteamPrices]);
  return (
    steamPrices && (
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
              {steamPrices.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.median_price}</td>
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
                  {Math.ceil(
                    steamPrices
                      .find(item => item.id === 2)
                      .median_price.replace(/[^\d.]/g, "") /
                      (steamPrices
                        .find(item => item.id === 1)
                        .median_price.replace(/[^\d.]/g, "") /
                        1000)
                  )}{" "}
                  <span>💎</span>
                </td>
              </tr>
              <tr>
                <td>
                  1 TF2 <span>🔑</span>
                </td>
                <td>
                  {Math.ceil(
                    steamPrices
                      .find(item => item.id === 3)
                      .median_price.replace(/[^\d.]/g, "") /
                      (steamPrices
                        .find(item => item.id === 1)
                        .median_price.replace(/[^\d.]/g, "") /
                        1000)
                  )}{" "}
                  <span>💎</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};
const mapStateToProps = state => ({ steamPrices: state.steamPrices });
const mapDispatchToProps = dispatch => ({
  getSteamPrices: () => dispatch(getSteamPrices())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPrices);
