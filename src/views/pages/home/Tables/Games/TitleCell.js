import React, { useState } from "react";
import { useDispatch } from "react-redux";

import EdiText from "react-editext";
import classNames from "classnames";

import GameSource from "views/pages/home/Modals/GameSource";
import { g2aOperations } from "state/ducks/g2a";
import { g2aHelper } from "views/enhancers";

import "./TitleCell.scss";

const TitleCell = ({
  game,
  status,
  open,
  title,
  length,
  listings,
  auction
}) => {
  const [editing, changeEditMode] = useState(false);
  const dispatch = useDispatch();

  const toggleEditing = () => {
    changeEditMode(prevState => {
      return !prevState;
    });
  };

  const onSave = val => {
    toggleEditing();
    if (val === game.search) {
      return;
    }
    if (title === val) {
      return;
    }
    dispatch(
      g2aOperations.fetchUpdatedGameItem(g2aHelper.genGameItem(game.id, val))
    );
  };

  const toggleExpand = () => {
    dispatch(g2aOperations.toggleExpand(game.id));
  };

  return (
    <th>
      <table className="border-none">
        <tbody>
          <tr className="">
            <td className="border-none block text-center w-6">
              {status ? (
                <span className="cursor-pointer" onClick={toggleExpand}>
                  {open ? "▼" : "►"}
                </span>
              ) : (
                <span>&nbsp;</span>
              )}
            </td>
            <td className="border-none relative w-full h-full" title={title}>
              {
                <EdiText
                  type="text"
                  value={title}
                  onSave={onSave}
                  onCancel={toggleEditing}
                  editing={editing}
                  viewProps={{
                    className: classNames({
                      "absolute inset-0 p-2 truncate": !open
                    })
                  }}
                  editButtonClassName="invisible"
                />
              }
            </td>
            <td className="border-none">
              {length ? <span>{`(${length})`}</span> : <span>&nbsp;</span>}
            </td>
          </tr>
          <tr
            className={classNames({
              hidden: !open
            })}
          >
            <td className="border-none text-center"></td>
            <td className="border-none">
              <GameSource listings={listings} id={game.id} />
              <button
                type="button"
                className="text-blue-700 underline cursor-pointer px-2"
                onClick={toggleEditing}
              >
                {editing ? "Cancel" : "Edit"}
              </button>
            </td>
            <td className="border-none text-center w-6">
              {length ? (
                <a
                  href={`https://www.g2a.com${length ? auction.slug : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <span>🔗</span>
                </a>
              ) : (
                <span>&nbsp;</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </th>
  );
};
export default TitleCell;
