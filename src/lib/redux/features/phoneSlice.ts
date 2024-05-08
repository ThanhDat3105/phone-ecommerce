import { CartItem, Order, ValueFormOrder } from "@/src/interface/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface phoneState {
  cartList: CartItem[];
  isLoading: boolean;
  filterBrand: string;
  filterType: string;
  accessToken: string;
  login: boolean;
}

export const phoneSlice = createSlice({
  name: "phone",
  initialState: {
    cartList: [],
    isLoading: true,
    filterBrand: "",
    filterType: "",
    accessToken: "",
    login: false,
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

    setFilterBrand: (state, action: PayloadAction<string>) => {
      state.filterBrand = action.payload;
    },

    setFilterType: (state, action: PayloadAction<string>) => {
      state.filterType = action.payload;
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    setLoginAction: (state, action: PayloadAction<boolean>) => {
      state.login = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const phoneAction = phoneSlice.actions;

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteCart,
  setCloseLoading,
  setFilterBrand,
  setFilterType,
  setAccessToken,
  setLoginAction,
} = phoneSlice.actions;

export const phoneReducer = phoneSlice.reducer;
