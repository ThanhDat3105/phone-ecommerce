interface CategoryBrandMapping {
  id_categoryBrand: number;
  id_brand: number;
  id_category: number;
  brand: Brand;
  category: Category;
}

interface Brand {
  name: string;
}

interface Category {
  name: string;
}

interface Color {
  hex: string;
  name: string;
}

export interface Product {
  id_product: number;
  id_categoryBrand: number;
  name: string;
  thumbnail: string;
  chip: string;
  price: number;
  original_price: number;
  battery: string;
  quantity: number;
  new_release: boolean;
  screen: string;
  front_camera: string;
  rear_camera: string;
  img: ImageInterface[];
  storage: Storage[];
  color: Color[];
  categoryBrandMapping: CategoryBrandMapping;
}

export interface ImageInterface {
  url: string;
}

export interface Storage {
  name: string;
}

export interface CartItem {
  id_product: number;
  thumbnail: string;
  name: string;
  storage: string;
  color: string;
  price: number;
  quantity: number;
}

export interface Order {
  id_user: number;
  name: string;
  phone: string;
  address: string;
  payment_method: string | undefined;
  delivery_by: string;
  total: number;
  productItem: ProductItem[];
}

export interface ValueFormOrder {
  values: {
    id_user: number;
    name: string;
    phone: string;
    address: string;
    payment_method: string | undefined;
    delivery_by: string;
    total: number;
    productItem: ProductItem[];
  };
}

export interface ProductItem {
  name: string;
  color: string;
  price: number;
  storage: string;
  quantity: number;
}
