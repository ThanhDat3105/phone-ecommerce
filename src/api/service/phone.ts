import { axiosRequest } from "@/src/configs/axios.config";

export const fetchListPhoneApi = (url:string) => {
  return axiosRequest({
    url,
    method: "GET",
  });
};

export const findProductByIdApi = (url: string) => {
  return axiosRequest({
    url,
    method: "GET",
  });
};
