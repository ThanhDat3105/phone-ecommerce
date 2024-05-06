import http from "../configs/http.config";
import { PhoneResType } from "../interface/product";

const phoneApiRequest = {
  fetchListPhoneApi: () => http.get<PhoneResType[]>("product/product-list"),

  findDetailPhoneById: (id: number) =>
    http.get<PhoneResType>(`product/find-product/${id}`),
};

export default phoneApiRequest;
