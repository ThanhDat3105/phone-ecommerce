import axios from "axios";
import { refreshTokenApi } from "../api/service/user";
import { UserData } from "../interface/user";

const axiosRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

let isRefreshToken = false;

axiosRequest.interceptors.request.use((config) => {
  const infoUser: UserData = JSON.parse(
    localStorage.getItem("USER_INFO_KEY") || "{}"
  );
  if (infoUser) {
    const accessToken = infoUser.accessToken;
    const refreshToken = infoUser.refreshToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers["refreshToken"] = `${refreshToken}`;
  }

  return config;
});

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const infoUser: UserData = JSON.parse(
      localStorage.getItem("USER_INFO_KEY") || "{}"
    );

    if (
      error.response?.data?.statusCode === 401 &&
      error.response?.data?.message === "Unauthorized" &&
      infoUser?.refreshToken &&
      !isRefreshToken
    ) {
      isRefreshToken = true;
      try {
        const response = await refreshTokenApi(infoUser);

        infoUser.accessToken = response.data.content.accessToken;
        infoUser.refreshToken = response.data.content.refreshToken;
        localStorage.setItem("USER_INFO_KEY", JSON.stringify(infoUser));
        error.config.headers.Authorization = `Bearer ${response.data.content.accessToken}`;
        error.config.headers[
          "refreshToken"
        ] = `${response.data.content.refreshToken}`;

        return axios(error.config);
      } catch (error) {
        alert("Login session ended. Please login again to continue!");
        window.location.href = "/sign_in";
      } finally {
        isRefreshToken = false;
      }
    }

    return Promise.reject(error);
  }
);

export { axiosRequest };
