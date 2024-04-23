import { axiosRequest } from "@/configs/axios.config";

export const fetchListBrandApi = (url: string) => {
  return axiosRequest({
    url,
    method: "GET",
  });
};
