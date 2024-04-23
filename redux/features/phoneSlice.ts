import {
  createOrderApi,
  fetchOrderApi,
  fetchOrderByIdUserApi,
} from "@/api/service/order";
import { OrderList } from "@/interface/order";
import {
  forgotPasswordApi,
  loginApi,
  registerApi,
  resetPasswordApi,
  verifyEmail,
} from "@/api/service/user";
import { Email, ResetPassword, UserSignIn, userLogin } from "@/interface/user";
import { CartItem, Order, ValueFormOrder } from "@/interface/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface phoneState {
  cartList: CartItem[];
  orderList: OrderList[];
  isLoading: boolean;
}

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

export const fetchOrderByIdUserAction = createAsyncThunk(
  "phoneReducer/fetchOrderByIdUserAction",
  async (id: number) => {
    try {
      const result = await fetchOrderByIdUserApi(id);
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
      if (result) {
        toast.success("Please check your email");
      } else {
        toast.error("Invalid Information");
      }
      return result;
    } catch (error: any) {
      if (error.response.data.message === "Email đã tồn tại") {
        toast.error("Email already exists");
      }
      console.log("Error: ", error.response.data.message);
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
      if (result) {
        toast.success("Reset successfully");
      }
    } catch (error) {
      toast.error("Password reset link has expired.");
    }
  }
);

export const verifyEmailAction = createAsyncThunk(
  "userReducer/verifyEmailAction",
  async (payload: string) => {
    try {
      await verifyEmail(payload);
    } catch (error) {
      console.log(error);
    }
  }
);

export const phoneSlice = createSlice({
  name: "phone",
  initialState: {
    cartList: [],
    isLoading: true,
    orderList: [],
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
        state.cartList.splice(indexToDelete, 1);
      }
    },

    setCloseLoading: (state, action: PayloadAction<any>) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAction.pending, (state) => {})
      .addCase(
        createOrderAction.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.cartList = [];
        }
      );
    builder
      .addCase(fetchOrderByIdUserAction.pending, (state) => {})
      .addCase(
        fetchOrderByIdUserAction.fulfilled,
        (state, action: PayloadAction<OrderList[]>) => {
          const result = action.payload;
          state.orderList = result;
        }
      );
    builder
      .addCase(fetchOrderAction.pending, (state) => {})
      .addCase(
        fetchOrderAction.fulfilled,
        (state, action: PayloadAction<OrderList[]>) => {
          const result = action.payload;
          state.orderList = result;
        }
      );
  },
});

export const phoneAction = phoneSlice.actions;

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteCart,
  setCloseLoading,
} = phoneSlice.actions;

export const phoneReducer = phoneSlice.reducer;
