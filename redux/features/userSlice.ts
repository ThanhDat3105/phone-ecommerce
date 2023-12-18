import { loginApi } from "@/api/service/user";
import { User, userLogin } from "@/interface/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface userState {
}

export const loginUser = createAsyncThunk(
  "userReducer/loginUser",
  async (payload: userLogin) => {
    try {
      const result: User = await loginApi(payload);
      localStorage.setItem("USER_INFO_KEY", JSON.stringify(result));
      toast.success("Login Successfully");
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
      const result = action.payload;
      localStorage.setItem("USER_INFO_KEY", JSON.stringify(result));
    });
  },
});

export const userAction = userSlice.actions;

export const userReducer = userSlice.reducer;
