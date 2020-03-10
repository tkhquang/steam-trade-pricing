import axios from "axios";

const Axios = axios.create({
  baseURL: `${process.env.API}`,
  timeout: 20000,
  headers: {
    "content-type": "application/json",
    Accept: "application/json"
  }
});

const request = async opts => {
  try {
    // Set to wrap only data from response by default
    const { data } = await Axios({ ...opts });

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default request;
