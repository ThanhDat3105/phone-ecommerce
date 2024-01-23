import axios from "axios";
import { env } from "process";

const axiosRequest = axios.create({
  baseURL: env.apiUrl,
  withCredentials: false,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

axiosRequest.interceptors.request.use((config) => {
  if (localStorage.getItem("USER_INFO_KEY")) {
    const userInfo = JSON.parse(localStorage.getItem("USER_INFO_KEY") || "{}");
    const accessToken = userInfo.accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export { axiosRequest };
