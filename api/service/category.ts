import { axiosRequest } from "@/configs/axios.config";

export const fetchListCategoryApi = () => {
  return axiosRequest({
    url: "category/category-list",
    method: "GET",
  });
};
