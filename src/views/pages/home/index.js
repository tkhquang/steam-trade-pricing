import React from "react";
import SteamPrices from "./SteamPrices";
import Input from "./Input";
import GameTable from "./Tables/Games";

const Main = () => {
  return (
    <main>
      <SteamPrices />
      <Input />
      <GameTable />
    </main>
  );
};

export default Main;
