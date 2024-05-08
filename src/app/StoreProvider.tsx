"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "@/src/lib/redux/store";
import { setAccessToken } from "../lib/redux/features/phoneSlice";

export default function StoreProvider({
  children,
  accessToken,
}: {
  children: React.ReactNode;
  accessToken?: string;
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = store();
  }
  storeRef.current.dispatch(setAccessToken(String(accessToken)));
  return <Provider store={storeRef.current}>{children}</Provider>;
}
