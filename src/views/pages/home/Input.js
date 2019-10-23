import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { g2aHelper } from "views/enhancers";
import { g2aOperations } from "state/ducks/g2a";

const placeholderText = `Input your game titles here...

e.g.
Divinity: Original Sin 2
Sid Meier's Civilization VI
...
..
.`;

const Input = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.g2a.entries.status.loading);

  const getPrices = e => {
    e.preventDefault();
    // Get game list array from user input
    const inputValue = inputRef.current.value
      .split(/[\r\n]+/)
      .map(item => item.trim())
      .filter(i => Boolean(i));
    const items = g2aHelper.genGameListObj(inputValue);
    dispatch(g2aOperations.fetchListings(items));
  };

  return (
    <div className="w-4/5 mx-auto mt-10">
      <form action="" method="GET" onSubmit={getPrices} className="w-full">
        <textarea
          ref={inputRef}
          placeholder={placeholderText}
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
    </div>
  );
};
export default Input;
