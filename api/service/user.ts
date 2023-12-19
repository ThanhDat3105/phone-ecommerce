import { axiosRequest } from "@/configs/axios.config";
import { userLogin } from "@/interface/user";

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
