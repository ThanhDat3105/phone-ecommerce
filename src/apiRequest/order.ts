import { Order } from "@/src/interface/product";
import http from "../configs/http.config";
import { OrderList } from "../interface/order";

const orderApiRequest = {
  fetchOrderByIdUserApi: (body: { id: number; accessToken: string }) =>
    http.get<OrderList[]>(`order/find-order-user/${body.id}`, {
      accessToken: body.accessToken,
    }),

  createOrderApi: (body: Order, accessToken: string) =>
    http.post("order/create-order", body, { accessToken }),
};

export default orderApiRequest;
