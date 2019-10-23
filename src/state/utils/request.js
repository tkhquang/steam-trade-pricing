import axios from "axios";
import errHandler from "./errHandler";

/* error shape
  {
    code: 500,
    message: "Internal Server Error"
  }
*/

const Axios = axios.create({
  baseURL: `${process.env.API}`,
  timeout: 20000
});

const request = async opts => {
  try {
    const { data } = await Axios({ ...opts });
    return data;
  } catch (error) {
    console.error("Request Error: ", errHandler(error));
    if (error.response) {
      const { status, data } = error.response;
      return {
        code: status,
        message: data.error ? data.error.message : data
      };
    }
    const { statusCode, message } = error;
    return {
      code: statusCode,
      message
    };
  }
};

export default request;
