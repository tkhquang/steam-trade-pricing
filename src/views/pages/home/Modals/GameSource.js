import React from "react";
import { useDispatch } from "react-redux";

import Popup from "reactjs-popup";
import { g2aOperations } from "state/ducks/g2a";

const ModalSource = ({ auctions, entryId }) => {
  const dispatch = useDispatch();
  return (
    <Popup
      trigger={
        <button
          type="button"
          className="text-blue-700 underline cursor-pointer disabled:cursor-not-allowed disabled:text-gray-500 disabled:no-underline disabled:opacity-50"
          disabled={!Object.keys(auctions).length}
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
            {Object.keys(auctions).length && (
              <table className="mx-auto">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(auctions).map(source => (
                    <tr
                      key={source.id}
                      className="cursor-pointer"
                      title="Use this source"
                      onClick={() => {
                        dispatch(
                          g2aOperations.fetchSelectedAuction({
                            entryId,
                            id: source.id
                          })
                        );
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
          {/* <div className="actions">
            <button
              className="button"
              onClick={() => {
                close();
              }}
            >
              Close modal
            </button>
          </div> */}
        </div>
      )}
    </Popup>
  );
};

export default ModalSource;
