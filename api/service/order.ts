import { axiosRequest } from "@/configs/axios.config";
import { Order } from "@/interface/product";

export const createOrderApi = (data: Order) => {
  return axiosRequest({
    url: "order/create-order",
    method: "POST",
    data,
  });
};

export const fetchOrderApi = () => {
  return axiosRequest({
    url: "order/order-list",
    method: "GET",
  });
};

export const fetchOrderByIdUserApi = (url: string) => {
  return axiosRequest({
    url,
    method: "GET",
  });
};
