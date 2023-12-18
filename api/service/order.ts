import { axiosRequest } from "@/configs/axios.config";
import { Order } from "@/interface/product";

export const createOrderApi = (data: Order) => {
  return axiosRequest({
    url: "order/create-order",
    method: "POST",
    data
  });
};
