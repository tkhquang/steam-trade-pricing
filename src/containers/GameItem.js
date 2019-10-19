import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

import Axios from "axios";

import Loader from "components/Loader";
import ItemTitle from "components/ItemTitle";

const API = process.env.API;

const GameItem = ({
  title,
  steamPrices,
  searchKey,
  updateTicks,
  updateSearchKey
}) => {
  const [itemListing, setItemListing] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [isFetching, setFetchingStatus] = useState(false);

  const fetchSelectedItem = async id => {
    try {
      const { data } = await Axios({
        url: `${API}/g2a-auction`,
        method: "GET",
        params: {
          id: id
        }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateSelectedItem = id => {
    if (id === selectedItem.id) {
      return;
    }
    setFetchingStatus(true);
    setItemPrice(null);
    setSelectedItem(itemListing.find(item => item.id === id));
    updateTicks(-1);
    fetchSelectedItem(id)
      .then(data => {
        setItemPrice(data.lowest_price);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        updateTicks(+1);
        setFetchingStatus(false);
      });
  };

  const getListingItems = async (key, qParams = {}) => {
    try {
      const { data } = await Axios({
        url: `${API}/g2a-listings`,
        method: "GET",
        params: {
          ...qParams,
          search: `${key}`
        }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const processListingItems = useCallback(async key => {
    try {
      const { docs } = await getListingItems(key);
      if (!docs.length) {
        // No items match the query
        setItemListing([]);
        setItemPrice(-1);
        throw new Error("Not Found!");
      }
      // Filtered out all profuct with no active listing
      const filtered = docs.filter(item => item.retailQty > 0);
      // Product not available
      if (!filtered.length) {
        setItemListing([]);
        setItemPrice(0);
        throw new Error("Product not available!");
      }
      setItemListing(filtered);
      setSelectedItem(filtered[0]);
      return filtered[0];
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setFetchingStatus(true);
    const getAndSetData = async () => {
      try {
        const { id } = await processListingItems(searchKey);
        console.log(id);
        fetchSelectedItem(id)
          .then(data => {
            setItemPrice(data.lowest_price);
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      } finally {
        updateTicks(+1);
        setFetchingStatus(false);
      }
    };
    getAndSetData();
  }, [processListingItems, searchKey, updateTicks]);
  return (
    <tr>
      <ItemTitle
        title={title}
        selectedItem={selectedItem}
        itemListing={itemListing}
        updateSelectedItem={updateSelectedItem}
        updateSearchKey={updateSearchKey}
        isFetching={isFetching}
        searchKey={searchKey}
      />
      {itemPrice !== null && itemPrice > 0 ? (
        <td className="text-center">{" $" + itemPrice}</td>
      ) : itemPrice === 0 ? (
        <td colSpan="4" className="text-center">
          <span>❌ Product Not Available</span>
        </td>
      ) : itemPrice === -1 ? (
        <td colSpan="4" className="text-center">
          <span>❌ Product Not Found</span>
        </td>
      ) : (
        <td colSpan="4" className="relative text-center">
          <Loader />
        </td>
      )}
      {itemPrice !== null && itemPrice > 0 && (
        <>
          <td className="text-center">
            {Math.ceil(
              itemPrice /
                (steamPrices
                  .find(item => item.id === 1)
                  .median_price.replace(/[^\d.]/g, "") /
                  1000)
            )}
          </td>
          <td className="text-center">
            {
              +(
                Math.round(
                  itemPrice /
                    steamPrices
                      .find(item => item.id === 3)
                      .median_price.replace(/[^\d.]/g, "") +
                    "e+" +
                    2
                ) +
                "e-" +
                2
              )
            }
          </td>
          <td className="text-center">
            {
              +(
                Math.round(
                  itemPrice /
                    steamPrices
                      .find(item => item.id === 2)
                      .median_price.replace(/[^\d.]/g, "") +
                    "e+" +
                    2
                ) +
                "e-" +
                2
              )
            }
          </td>
        </>
      )}
    </tr>
  );
};

const mapStateToProps = state => ({
  steamPrices: state.steamPrices
});

export default connect(
  mapStateToProps,
  null
)(GameItem);
