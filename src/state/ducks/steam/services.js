import { request } from "@utils";

export const getPrices = async (...opts) => {
  try {
    const { data } = await request({
      url: "/steam/prices",
      method: "GET",
      ...opts
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
