import { request } from "state/utils";

export const getPrices = async () => {
  try {
    const { data } = await request({
      url: "/steam/prices",
      method: "GET"
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
