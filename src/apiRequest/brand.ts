import http from "../configs/http.config";
import { BrandResType } from "../interface/brand";

const brandApiRequest = {
  fetchListBrandApi: () => http.get<BrandResType[]>("brand/brand-list"),
};
export default brandApiRequest;
