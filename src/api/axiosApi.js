// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import { parse, stringify } from "qs";

const base_url = process.env.REACT_APP_BASE_URL

const axiosApi = axios.create({
    baseURL: base_url,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
      },
});



axiosApi.interceptors.request.use(async (config) => {
  // Handle token here ...
  console.log("token in here");
  return config;
});

axiosApi.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosApi;