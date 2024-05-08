import http from "../configs/http.config";
import {
  Email,
  LoginBodyType,
  LoginRegisResType,
  RegisterBodyType,
} from "../interface/user";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post<LoginRegisResType>("auth/login", body),

  register: (body: RegisterBodyType) =>
    http.post<LoginRegisResType>("auth/sign-up", body),

  auth: (body: { accessToken: string; refreshToken: string }) =>
    http.post("api/auth", body, {
      baseUrl: "",
    }),

  refreshTokenFromClientToServer: () =>
    http.post("api/auth/refresh-token", null, { baseUrl: "" }),

  refreshToken: (body: { refreshToken: string }) =>
    http.post("auth/refresh-token", null, { refreshToken: body.refreshToken }),

  forgotPassword: (body: Email) => http.post("auth/forgot-password", body),

  resetPassword: (body: string, token: string) =>
    http.put(`auth/reset-password/${token}`, body),

  logoutApi: (body: { accessToken: string }) =>
    http.patch("auth/logout", null, {
      accessToken: body.accessToken,
    }),

  logoutFromClientToNextServer: (force?: boolean | undefined) =>
    http.post(
      "api/auth/logout",
      { force: force },
      {
        baseUrl: "",
      }
    ),

  verifyEmail: (email: string) => http.put(`auth/verify-email/${email}`),

  fetchProfile: (body: { accessToken: string }) =>
    http.get("auth/profile", { accessToken: body.accessToken }),
};

export default authApiRequest;
