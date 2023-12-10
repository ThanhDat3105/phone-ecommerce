import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";

const baseURL = "https://backend-movie-longvo00221.vercel.app/api/v1/";
const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "[]")
    : [];
const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  } as InternalAxiosRequestConfig<any>;
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
