import React from "react";
import { connect } from "react-redux";

import ItemPrices from "./containers/ItemPrices";
import GameContainer from "./containers/GameContainer";
import Loader from "./components/Loader";

const App = ({ steamPrices }) => {
  return (
    <div className="pb-10">
      <ItemPrices />
      {steamPrices ? <GameContainer /> : <Loader />}
    </div>
  );
};

const mapStateToProps = state => ({
  steamPrices: state.steamPrices
});

export default connect(
  mapStateToProps,
  null
)(App);
