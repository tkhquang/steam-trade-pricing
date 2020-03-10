import { request } from "@utils";

// 'search' query required
// Fetch all the listing auctions based on search key
export const getList = async (search, opts = {}) => {
  try {
    const { data } = await request({
      url: "/g2a/auctions",
      method: "GET",
      params: {
        search
      },
      ...opts
    });
    const { total, auctions, message } = data;
    let obj = {};
    auctions.forEach(auction => {
      obj = {
        ...obj,
        [auction.id]: auction
      };
    });
    return {
      total,
      auctions: obj,
      message
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

// 'id' params required
// Fetch the auction which based on the given id
export const getAuction = async (id, opts = {}) => {
  try {
    const { data } = await request({
      url: `/g2a/auctions/${id}`,
      method: "GET",
      ...opts
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
