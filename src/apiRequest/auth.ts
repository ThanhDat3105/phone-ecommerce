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

  auth: (body: { sessionToken: string }) =>
    http.post("api/auth", body, {
      baseUrl: "",
    }),

  forgotPassword: (body: Email) => http.post("auth/forgot-password", body),

  resetPassword: (body: string, token: string) =>
    http.put(`auth/reset-password/${token}`, body),

  logoutApi: (body: { sessionToken: string }) =>
    http.patch("auth/logout", "", { sessionToken: body.sessionToken }),

  verifyEmail: (email: string) => http.put(`auth/verify-email/${email}`),
};

export default authApiRequest;
