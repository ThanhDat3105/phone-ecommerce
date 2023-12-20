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
  isLoading: boolean;
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
    isLoading: true,
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
          state.cartList = state.cartList.filter(
            (p: CartItem) =>
              p.id_product !== id_product ||
              p.color !== color ||
              p.storage !== storage
          );
        } else {
          item.quantity--;
        }
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

        if (result) {
          toast.success("Order Success");
        }
      }
    );
  },
});

export const phoneAction = phoneSlice.actions;

export const { addToCart, increaseQuantity, decreaseQuantity } =
  phoneSlice.actions;

export const phoneReducer = phoneSlice.reducer;
