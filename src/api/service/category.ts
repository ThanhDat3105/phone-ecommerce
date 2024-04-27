import { axiosRequest } from "@/src/configs/axios.config";

export const fetchListCategoryApi = (url: string) => {
  return axiosRequest({
    url,
    method: "GET",
  });
};