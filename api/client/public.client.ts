import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";

const baseURL = "https://backend-movie-longvo00221.vercel.app/api/v1/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  } as InternalAxiosRequestConfig<any>;
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default publicClient;
