import React, { useRef, useState, useCallback } from "react";

import GameItem from "./GameItem";

const GameContainer = () => {
  const [ticks, setTicks] = useState(0);
  const [gameItems, setGameItems] = useState([]);
  const inputRef = useRef();
  const getPrices = e => {
    e.preventDefault();
    // Get game list array from user input
    const inputValue = inputRef.current.value
      .split(/[\r\n]+/)
      .map(item => item.trim())
      .filter(i => Boolean(i));
    const items = inputValue.map(item => ({
      searchKey: item.toLowerCase().replace(/:|\\|\/|™|®|\.|\?|!/g, ""),
      title: item,
      time: Date.now()
    }));
    setTicks(0);
    setGameItems(items);
  };

  const updateTicks = useCallback(step => {
    return setTicks(prevState => {
      return prevState + step;
    });
  }, []);

  const updateSearchKey = (oldKey, newKey) => {
    setGameItems(prevState => {
      const newState = [...prevState];
      const index = prevState.findIndex(item => item.searchKey === oldKey);
      console.log(index);
      newState[index] = {
        searchKey: newKey.toLowerCase().replace(/:|\\|\/|™|®|\.|\?|!/g, ""),
        title: newKey,
        time: Date.now()
      };
      return newState;
    });
  };

  const isFetching = Boolean(gameItems.length > ticks);

  return (
    <div className="w-4/5 mx-auto mt-10">
      <form action="" method="GET" onSubmit={getPrices} className="w-full">
        <textarea
          ref={inputRef}
          placeholder={`Input your game titles here... \n\ne.g. \nDivinity: Original Sin 2\nSid Meier's Civilization VI`}
          className="w-full p-2 bg-teal-900"
          rows="10"
        />
        <button
          type="submit"
          disabled={isFetching}
          className="w-full mt-2 inline-block bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 border border-teal-500 rounded disabled:cursor-not-allowed disabled:bg-gray-700"
        >
          {isFetching ? "Loading..." : "Submit"}
        </button>
      </form>
      <div>
        {gameItems.length > 0 && (
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
              {gameItems.map((item, idx) => (
                <GameItem
                  title={item.title}
                  searchKey={item.searchKey}
                  key={`${item.searchKey}-${idx}-${item.time}`}
                  updateTicks={updateTicks}
                  updateSearchKey={updateSearchKey}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default GameContainer;
