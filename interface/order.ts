interface Product {
  name: string;
}

export interface OrderItem {
  id_orderItem: number;
  product: Product;
}

export interface OrderList {
  id_order: number;
  id_user: number;
  phone: string;
  address: string;
  payment_method: string;
  delivery_by: string;
  total: number;
  created_date: string;
  OrderItem: OrderItem[];
}
