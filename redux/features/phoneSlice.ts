import { fetchListBrandApi } from "@/api/service/brand";
import { fetchListCategoryApi } from "@/api/service/category";
import { createOrderApi } from "@/api/service/order";
import { fetchListPhoneApi, findProductByIdApi } from "@/api/service/phone";
import { Brand } from "@/interface/brand";
import { Category } from "@/interface/category";
import { CartItem, Order, Product, ValueFormOrder } from "@/interface/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface phoneState {
  phoneList: Product[];
  brandList: Brand[];
  categoryList: Category[];
  phoneInfo: Product | undefined;
  cartList: CartItem[];
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

export const phoneSlice = createSlice({
  name: "phone",
  initialState: {
    phoneList: [],
    brandList: [],
    categoryList: [],
    phoneInfo: undefined,
    cartList: [],
  } as phoneState,

  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const item = state.cartList.find(
        (p: CartItem) => p.id_product === action.payload.id_product
      );
      if (item) {
        item.quantity++;
      } else {
        state.cartList.push({ ...action.payload, quantity: 1 });
      }
    },

    inCreaseQuantity: (state, action: PayloadAction<any>) => {
      const item = state.cartList.find(
        (p: CartItem) => p.id_product === action.payload.id_product
      );
      if (item) {
        item.quantity++;
      }
    },

    deCreaseQuantity: (state, action: PayloadAction<any>) => {
      const item = state.cartList.find(
        (p: CartItem) => p.id_product === action.payload.id_product
      );
      if (item) {
        if (item.quantity === 1) {
          return;
        } else {
          item.quantity--;
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchListPhoneAction.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.phoneList = action.payload;
      }
    );
    builder.addCase(
      fetchListBrandAction.fulfilled,
      (state, action: PayloadAction<Brand[]>) => {
        const result = action.payload;
        state.brandList = result;
      }
    );
    builder.addCase(
      fetchListCategoryAction.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        const result = action.payload;
        state.categoryList = result;
      }
    );
    builder.addCase(
      FindProductByIdAction.fulfilled,
      (state, action: PayloadAction<Product | undefined>) => {
        const result = action.payload;
        state.phoneInfo = result;
      }
    );
    builder.addCase(
      createOrderAction.fulfilled,
      (state, action: PayloadAction<Order>) => {
        const result = action.payload;

        if (result) {
          toast.success("Order Success");
        }
      }
    );
  },
});

export const phoneAction = phoneSlice.actions;

export const { addToCart, inCreaseQuantity, deCreaseQuantity } =
  phoneSlice.actions;

export const phoneReducer = phoneSlice.reducer;
