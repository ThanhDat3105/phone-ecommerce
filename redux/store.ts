import { phoneReducer } from "./features/phoneSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/userSlice";

const rootReducer = combineReducers({
  phoneReducer,
  userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
