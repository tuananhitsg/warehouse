// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import { parse, stringify } from "qs";
const base_url = process.env.REACT_APP_BASE_URL;

const axiosApi = axios.create({
  baseURL: base_url,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
    serialize: (query) => queryString.parse(query),
  },
});

axiosApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  console.log("Token: " + token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
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
