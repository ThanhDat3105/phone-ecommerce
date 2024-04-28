"use client";
import { refreshTokenApi } from "@/src/api/service/user";
import { User } from "@/src/interface/user";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const getCookie = (name: string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const getLocalStorage = () => {
    const userLocalStorage = localStorage.getItem("USER_INFO_KEY");
    if (userLocalStorage) {
      return JSON.parse(userLocalStorage);
    }
  };

  const fetchRefreshToken = async (user: User) => {
    const result = await refreshTokenApi(user);

    if (result.data.statusCode === 200) {
      var expires = "";
      var date = new Date();
      date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
      document.cookie =
        "accessToken=" +
        (result.data.content.accessToken || "") +
        expires +
        "; path=/";
    } else if (result.data.statusCode === 401) {
      localStorage.removeItem("USER_INFO_KEY");
      toast.warning("Login session ended!");
      router.push("/sign_in");
    }
  };

  const sessionEnded = async () => {
    localStorage.removeItem("USER_INFO_KEY");
    toast.warning("Login session ended!");
    router.push("/sign_in");
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (accessToken === null) {
      const userLocalStorage = getLocalStorage();
      if (userLocalStorage) {
        fetchRefreshToken(userLocalStorage);
      }
    }

    if (refreshToken === null) {
      sessionEnded();
    }
  }, []);

  return <div>{children}</div>;
}
