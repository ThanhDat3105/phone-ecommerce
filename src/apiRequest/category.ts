import http from "../configs/http.config";
import { CategoryResType } from "../interface/category";

const categoryApiRequest = {
  fetchListCategoryApi: () =>
    http.get<CategoryResType[]>("category/category-list"),
};
export default categoryApiRequest;
