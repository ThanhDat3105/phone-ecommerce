import {
  forgotPasswordApi,
  loginApi,
  registerApi,
  resetPasswordApi,
} from "@/api/service/user";
import { Email, ResetPassword, UserSignIn, userLogin } from "@/interface/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface userState {}

export const loginUser = createAsyncThunk(
  "userReducer/loginUser",
  async (payload: userLogin) => {
    try {
      const result = await loginApi(payload);
      localStorage.setItem(
        "USER_INFO_KEY",
        JSON.stringify(result.data.content)
      );
      toast.success("Login Successfully");
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

export const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    userInfo: undefined,
  } as userState,

  reducers: {},
});

export const userAction = userSlice.actions;

export const userReducer = userSlice.reducer;
