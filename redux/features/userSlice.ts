import { loginApi, registerApi } from "@/api/service/user";
import { User, UserSignIn, userLogin } from "@/interface/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface userState {}

export const loginUser = createAsyncThunk(
  "userReducer/loginUser",
  async (payload: userLogin) => {
    try {
      const result = await loginApi(payload);
      return result;
    } catch (error) {
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

export const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    userInfo: undefined,
  } as userState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action.payload?.data.content);
      localStorage.setItem(
        "USER_INFO_KEY",
        JSON.stringify(action.payload?.data.content)
      );
      toast.success("Login Successfully");
    });
  },
});

export const userAction = userSlice.actions;

export const userReducer = userSlice.reducer;
