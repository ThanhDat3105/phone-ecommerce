"use client";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import authApiRequest from "@/src/apiRequest/auth";
import Cookies from "js-cookie";

export default function RefreshToken() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const access = Cookies.get("accessToken");
      const refresh = Cookies.get("refreshToken");
      if (access && refresh) {
        const decoded = jwtDecode(access);

        const now = new Date();
        const expiresAt = new Date(Number(decoded.exp) * 1000);

        const timeNow = moment(now);
        const timeExpiresAt = moment(expiresAt);

        const time1OneHourLater = timeNow.clone().add(30, "seconds");

        if (time1OneHourLater.isSameOrAfter(timeExpiresAt)) {
          const res = await authApiRequest.refreshToken({
            refreshToken: refresh,
          });

          const { accessToken, refreshToken } = res.payload;

          await authApiRequest.auth({ accessToken, refreshToken });
        }
      }
    }, 1000 * 10);

    return () => clearInterval(interval);
  }, []);
  return null;
}
