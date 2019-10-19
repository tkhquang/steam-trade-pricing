import React from "react";
import Popup from "reactjs-popup";

const ModalSource = ({ updateSelectedItem, itemListing }) => {
  return (
    <Popup
      trigger={
        <button
          type="button"
          className="text-blue-700 underline cursor-pointer disabled:cursor-not-allowed disabled:text-gray-500 disabled:no-underline disabled:opacity-50"
          disabled={!itemListing || !itemListing.length}
        >
          Source
        </button>
      }
      modal
    >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Available Sources </div>
          <div className="content">
            {itemListing.length && (
              <table className="mx-auto">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {itemListing.map(source => (
                    <tr
                      key={source.id}
                      className="cursor-pointer"
                      title="Use this source"
                      onClick={() => {
                        updateSelectedItem(source.id);
                        close();
                      }}
                    >
                      <td>{source.id}</td>
                      <td>{source.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ModalSource;
