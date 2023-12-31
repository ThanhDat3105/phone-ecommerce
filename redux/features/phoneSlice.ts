import { fetchListBrandApi } from "@/api/service/brand";
import { fetchListCategoryApi } from "@/api/service/category";
import { createOrderApi, fetchOrderApi } from "@/api/service/order";
import { fetchListPhoneApi, findProductByIdApi } from "@/api/service/phone";
import { Brand } from "@/interface/brand";
import { Category } from "@/interface/category";
import { OrderList } from "@/interface/order";
import {
  forgotPasswordApi,
  loginApi,
  registerApi,
  resetPasswordApi,
} from "@/api/service/user";
import { Email, ResetPassword, UserSignIn, userLogin } from "@/interface/user";
import { CartItem, Order, Product, ValueFormOrder } from "@/interface/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface phoneState {
  phoneList: Product[];
  brandList: Brand[];
  categoryList: Category[];
  phoneInfo: Product | undefined;
  cartList: CartItem[];
  isLoading: boolean;
  orderList: OrderList[];
}

export const fetchListPhoneAction = createAsyncThunk(
  "phoneReducer/fetchListPhoneAction",
  async () => {
    try {
      const result = await fetchListPhoneApi();
      return result.data.content;
    } catch (error) {
      console.log("Error BE");
    }
  }
);

export const fetchListBrandAction = createAsyncThunk(
  "brandReducer/fetchListBrandAction",
  async () => {
    try {
      const result = await fetchListBrandApi();
      return result.data.content;
    } catch (error) {
      console.log("Error BE");
    }
  }
);

export const fetchListCategoryAction = createAsyncThunk(
  "brandReducer/fetchListCategoryAction",
  async () => {
    try {
      const result = await fetchListCategoryApi();
      return result.data.content;
    } catch (error) {
      console.log("Error BE");
    }
  }
);

export const FindProductByIdAction = createAsyncThunk(
  "phoneReducer/FindProductByIdAction",
  async (id: number) => {
    try {
      const result = await findProductByIdApi(id);
      return result.data.content;
    } catch (error) {
      console.log("Error BE");
    }
  }
);

export const createOrderAction = createAsyncThunk(
  "phoneReducer/createOrderAction",
  async (data: ValueFormOrder) => {
    try {
      const result = await createOrderApi(data.values);
      return result.data.content;
    } catch (error) {
      console.log("Error BE");
    }
  }
);

export const fetchOrderAction = createAsyncThunk(
  "phoneReducer/fetchOrderAction",
  async () => {
    try {
      const result = await fetchOrderApi();
      return result.data.content;
    } catch (error) {
      console.log("Error BE");
    }
  }
);

export const loginUser = createAsyncThunk(
  "userReducer/loginUser",
  async (payload: userLogin) => {
    try {
      const result = await loginApi(payload);

      if (result) {
        localStorage.setItem(
          "USER_INFO_KEY",
          JSON.stringify(result.data.content)
        );
        toast.success("Login Successfully");
        return result;
      }
    } catch (error: any) {
      toast.error("Invalid Information");
    }
  }
);

export const registerUser = createAsyncThunk(
  "userReducer/registerUser",
  async (payload: UserSignIn) => {
    try {
      const result = await registerApi(payload);
      toast.success("Register Successfully");
      return result;
    } catch (error) {
      toast.error("Invalid Information");
    }
  }
);

export const forgotPasswordUser = createAsyncThunk(
  "userReducer/forgotPasswordUser",
  async (payload: Email) => {
    try {
      const result = await forgotPasswordApi(payload);
      if (result) {
        toast.success("Please check your email");
      } else {
        toast.error("Invalid Information");
      }
      return result;
    } catch (error: any) {
      console.log("Error: ", error.response.data.message);
    }
  }
);

export const resetPasswordUser = createAsyncThunk(
  "userReducer/resetPasswordUser",
  async (payload: ResetPassword) => {
    try {
      const result = await resetPasswordApi(payload);
      toast.success("Reset successfully");
      return result;
    } catch (error) {
      toast.error("Password reset link has expired.");
    }
  }
);

export const phoneSlice = createSlice({
  name: "phone",
  initialState: {
    phoneList: [],
    brandList: [],
    categoryList: [],
    phoneInfo: undefined,
    cartList: [],
    isLoading: true,
    orderList: [],
    userInfo: undefined,
  } as phoneState,

  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const { id_product, color, storage } = action.payload;

      const item = state.cartList.find(
        (p: CartItem) =>
          p.id_product === id_product &&
          p.color === color &&
          p.storage === storage
      );

      if (item) {
        item.quantity++;
      } else {
        state.cartList.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseQuantity: (state, action: PayloadAction<any>) => {
      const { id_product, color, storage } = action.payload;

      const item = state.cartList.find(
        (p: CartItem) =>
          p.id_product === id_product &&
          p.color === color &&
          p.storage === storage
      );

      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<any>) => {
      const { id_product, color, storage } = action.payload;

      const item = state.cartList.find(
        (p: CartItem) =>
          p.id_product === id_product &&
          p.color === color &&
          p.storage === storage
      );

      if (item) {
        if (item.quantity === 1) {
          return;
        } else {
          item.quantity--;
        }
      }
    },

    deleteCart: (state, action: PayloadAction<any>) => {
      const idToDelete = action.payload;

      const indexToDelete = state.cartList.findIndex(
        (p: CartItem) => p.id_product === idToDelete
      );

      if (indexToDelete !== -1) {
        console.log(indexToDelete);
        state.cartList.splice(indexToDelete, 1);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchListPhoneAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchListPhoneAction.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.phoneList = action.payload;
          state.isLoading = false;
        }
      );
    builder
      .addCase(fetchListBrandAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchListBrandAction.fulfilled,
        (state, action: PayloadAction<Brand[]>) => {
          const result = action.payload;
          state.brandList = result;
          state.isLoading = false;
        }
      );
    builder
      .addCase(fetchListCategoryAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchListCategoryAction.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          const result = action.payload;
          state.categoryList = result;
          state.isLoading = false;
        }
      );
    builder
      .addCase(FindProductByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        FindProductByIdAction.fulfilled,
        (state, action: PayloadAction<Product | undefined>) => {
          const result = action.payload;
          state.phoneInfo = result;
          state.isLoading = false;
        }
      );
    builder.addCase(
      createOrderAction.fulfilled,
      (state, action: PayloadAction<Order>) => {
        const result = action.payload;
        state.cartList = [];
        if (result) {
          toast.success("Order Success");
        }
      }
    );
    builder
      .addCase(fetchOrderAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchOrderAction.fulfilled,
        (state, action: PayloadAction<OrderList[]>) => {
          const result = action.payload;
          state.orderList = result;
          state.isLoading = false;
        }
      );
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      });
  },
});

export const phoneAction = phoneSlice.actions;

export const { addToCart, increaseQuantity, decreaseQuantity, deleteCart } =
  phoneSlice.actions;

export const phoneReducer = phoneSlice.reducer;
