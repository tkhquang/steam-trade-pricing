import Axios from "axios";

const API = process.env.API;

const setSteamPrices = payload => ({
  type: "setSteamPrices",
  payload
});

const setFetchingGDStatus = payload => ({
  type: "setFetchingGDStatus",
  payload
});

const getSteamPrices = () => {
  return dispatch => {
    Axios({ url: `${API}/steam-prices`, method: "GET" })
      .then(({ data }) => {
        dispatch(setSteamPrices(data.data));
      })
      .catch(error => {
        console.error(error);
        alert("Error getting Steam Prices, please try again!");
      });
  };
};

export { getSteamPrices, setFetchingGDStatus };
