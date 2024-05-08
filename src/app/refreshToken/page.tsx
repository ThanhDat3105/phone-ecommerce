"use client";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import authApiRequest from "@/src/apiRequest/auth";

export default function RefreshToken() {
  useEffect(() => {
    const interval = setInterval(async () => {
      if (typeof window !== "undefined") {
        const userLocal = localStorage.getItem("USER_INFO_KEY");

        if (userLocal) {
          const parseUserLocal = JSON.parse(userLocal);
          const accessTokenLocal = parseUserLocal.accessToken;
          const refreshTokenLocal = parseUserLocal.refreshToken;
          const decoded = jwtDecode(accessTokenLocal);

          const now = new Date();
          const expiresAt = new Date(Number(decoded.exp) * 1000);

          const timeNow = moment(now);
          const timeExpiresAt = moment(expiresAt);

          const time1OneHourLater = timeNow.clone().add(30, "seconds");

          if (time1OneHourLater.isSameOrAfter(timeExpiresAt)) {
            const res = await authApiRequest.refreshToken({
              refreshToken: refreshTokenLocal,
            });

            const { accessToken, refreshToken } = res.payload;

            // const newUserLocal = {
            //   ...parseUserLocal,
            //   accessToken,
            //   refreshToken,
            // };

            // await authApiRequest.auth({ accessToken, refreshToken });
            // localStorage.setItem("USER_INFO_KEY", JSON.stringify(newUserLocal));
          }
        }
      }
    }, 1000 * 10);

    return () => clearInterval(interval);
  }, []);
  return null;
}
