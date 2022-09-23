import axios from "axios";
import myApiMap from "./apiMap";

const BASE_URL = "http://27.72.29.21:60000";
// const BASE_URL = "http://27.72.29.21:8281";

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const config = (method, url, data, header) => {
  let obj = {
    method,
    url,
  };
  if (data) {
    if (method === "get") {
      obj["params"] = data;
    } else {
      obj["data"] = data;
    }
  }
  if (header) {
    obj["headers"] = header;
  }
  return obj;
};

const apiMap = { ...myApiMap(config) };
const api = async (apiName, apiParams) => {
  const config = apiMap[apiName](apiParams);
  try {
    const { data } = await request(config);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export default api;
