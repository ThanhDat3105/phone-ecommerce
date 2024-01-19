interface ProductItem {
  name: string;
  color: string;
  price: number;
  storage: string;
  quantity: number;
}

export interface OrderList {
  id_order: number;
  id_user: number;
  name: string;
  phone: string;
  address: string;
  payment_method: string;
  delivery_by: string;
  total: number;
  created_date: string;
  productItem: ProductItem[];
}
