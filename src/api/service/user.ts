import { axiosRequest } from "@/src/configs/axios.config";
import { Email, ResetPassword, User, userLogin } from "@/src/interface/user";

export const loginApi = (data: userLogin) => {
  return axiosRequest({
    url: `auth/login`,
    method: "POST",
    data,
  });
};

export const registerApi = (data: userLogin) => {
  return axiosRequest({
    url: `auth/sign-up`,
    method: "POST",
    data,
  });
};

export const forgotPasswordApi = (data: Email) => {
  return axiosRequest({
    url: `auth/forgot-password`,
    method: "POST",
    data,
  });
};

export const resetPasswordApi = (data: ResetPassword) => {
  return axiosRequest({
    url: `auth/reset-password/${data.token}`,
    method: "PUT",
    data: { password: data.password },
  });
};

export const verifyEmail = (email: string) => {
  return axiosRequest({
    url: `auth/verify-email/${email}`,
    method: "PUT",
  });
};

export const refreshTokenApi = (user: User) => {
  return axiosRequest({
    url: `auth/refresh-token`,
    method: "POST",
    data: user,
  });
};
