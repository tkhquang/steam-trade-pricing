const reducers = (state, action) => {
  switch (action.type) {
    case "setSteamPrices":
      return {
        ...state,
        steamPrices: action.payload
      };
    case "setFetchingGDStatus":
      return {
        ...state,
        isFetchingGameData: action.payload
      };
    default:
      return state;
  }
};

export default reducers;
