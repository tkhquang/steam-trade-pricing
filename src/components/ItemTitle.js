import React, { useState } from "react";

import EdiText from "react-editext";
import classNames from "classnames";

import "./ItemTitle.scss";
import ModalSource from "./ModalSource";

const ItemTitle = ({
  title,
  selectedItem,
  itemListing,
  updateSelectedItem,
  updateSearchKey,
  isFetching,
  searchKey
}) => {
  const [status, changeStatus] = useState(false);
  const [editing, changeEditMode] = useState(false);

  const toggleExpand = () => {
    changeStatus(prevState => {
      return !prevState;
    });
  };

  const toggleEditing = () => {
    changeEditMode(prevState => {
      return !prevState;
    });
  };

  const onSave = val => {
    if (val === searchKey) {
      return;
    }
    if (selectedItem && selectedItem.name === val) {
      return;
    }
    updateSearchKey(searchKey, val);
  };
  return (
    <th>
      <table className="border-none">
        <tbody>
          <tr className="">
            <td className="border-none block text-center w-6">
              {!isFetching ? (
                <span className="cursor-pointer" onClick={toggleExpand}>
                  {status ? "▼" : "►"}
                </span>
              ) : (
                <span>&nbsp;</span>
              )}
            </td>
            <td
              className="border-none relative w-full h-full"
              title={
                !selectedItem
                  ? title
                  : `${selectedItem.name} (${itemListing.length})`
              }
            >
              {
                <EdiText
                  type="text"
                  value={!selectedItem ? title : selectedItem.name}
                  onSave={onSave}
                  onCancel={toggleEditing}
                  editing={editing}
                  viewProps={{
                    className: classNames({
                      "absolute inset-0 p-2 truncate": !status
                    })
                  }}
                  editButtonClassName="invisible"
                />
              }
            </td>
            <td className="border-none">
              {selectedItem ? (
                <span>{`(${itemListing.length})`}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </td>
          </tr>
          <tr
            className={classNames({
              hidden: !status
            })}
          >
            <td className="border-none text-center"></td>
            <td className="border-none">
              <ModalSource
                updateSelectedItem={updateSelectedItem}
                itemListing={itemListing}
              />
              <button
                type="button"
                className="text-blue-700 underline cursor-pointer px-2"
                onClick={toggleEditing}
              >
                {editing ? "Cancel" : "Edit"}
              </button>
            </td>
            <td className="border-none block text-center w-6">
              {selectedItem ? (
                <a
                  href={`https://www.g2a.com${
                    selectedItem ? selectedItem.slug : ""
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  🔗
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
}; /* <EdiText
  type="text"
  saveButtonContent="Apply"
  cancelButtonContent="Cancel"
  saveButtonClassName="custom-save-button"
  editButtonClassName="custom-edit-button"
  cancelButtonClassName="custom-cancel-button"
  editButtonContent="Edit"
  value={!selectedItem ? title : `${selectedItem.name}`}
  onSave={onSave}
/> */
export default ItemTitle;
