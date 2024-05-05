import { ProductItem } from "./product";

export interface userLogin {
  email: string;
  password: string;
}

export interface Email {
  email: string;
}

export interface Password {
  password: string;
  confirmPassword: string;
}

export interface ResetPassword {
  password: string;
  token: string;
}

export interface User {
  id_user: number;
  name: string;
  email: string;
  password: string;
  birthday: string;
  address: string;
  phone: string;
  role: boolean;
  verifyEmail: boolean;
  verifyEmailToken: string | null;
  resetPasswordToken: string | null;
  resetPasswordExpire: string | null;
}

export interface UserProfile {
  id_user: number;
  name: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
  productItem: ProductItem[];
}

export interface UserSignIn {
  name: string;
  email: string;
  password: string;
  birthday?: string;
  address: string;
  phone: string;
}

export interface UserData {
  id_user: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  address: string;
  accessToken: string;
  refreshToken: string;
}
