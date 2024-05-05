"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "@/src/lib/redux/store";
import { setSessionToken } from "../lib/redux/features/phoneSlice";

export default function StoreProvider({
  children,
  sessionToken,
}: {
  children: React.ReactNode;
  sessionToken?: string;
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = store();
  }
  storeRef.current.dispatch(setSessionToken(String(sessionToken)));
  return <Provider store={storeRef.current}>{children}</Provider>;
}
