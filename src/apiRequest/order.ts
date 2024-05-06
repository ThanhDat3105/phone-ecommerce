import { Order } from "@/src/interface/product";
import http from "../configs/http.config";
import { OrderList } from "../interface/order";

const orderApiRequest = {
  fetchOrderByIdUserApi: (body: { id: number; sessionToken: string }) =>
    http.get<OrderList[]>(`order/find-order-user/${body.id}`, {
      sessionToken: body.sessionToken,
    }),

  createOrderApi: (body: Order, sessionToken: string) =>
    http.post("order/create-order", body, { sessionToken }),
};

export default orderApiRequest;
