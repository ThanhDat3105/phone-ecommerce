import { axiosRequest } from "@/configs/axios.config";

export const fetchListBrandApi = () => {
  return axiosRequest({
    url: "brand/brand-list",
    method: "GET",
  });
};
