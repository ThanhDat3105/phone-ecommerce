import { axiosRequest } from "@/configs/axios.config";

export const fetchListPhoneApi = () => {
  return axiosRequest({
    url: "product/product-list",
    method: "GET",
  });
};

export const findProductByIdApi = (id: number) => {
  return axiosRequest({
    url: `product/find-product/${id}`,
    method: "GET",
  });
};
