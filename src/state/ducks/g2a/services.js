import { request } from "state/utils";

// 'search' required
// Fetch all the listing auctions based on search key
export const getList = async opts => {
  try {
    const { data } = await request({
      url: "/g2a/listings",
      method: "GET",
      ...opts
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// 'id' required
// Fetch the auction which based on the given id
export const getAuction = async opts => {
  try {
    const { data } = await request({
      url: "/g2a/auction",
      method: "GET",
      ...opts
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
