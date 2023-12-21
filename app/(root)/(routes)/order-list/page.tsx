"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../../MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOrderAction } from "@/redux/features/phoneSlice";
import OrderLeft from "./components/OrderLeft";
import { User } from "@/interface/user";

export default function OrderList() {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User>();

  const handleFetchApi = () => {
    dispatch(fetchOrderAction());
  };

  useEffect(() => {
    handleFetchApi();

    if (typeof window !== "undefined") {
      const result = localStorage.getItem("USER_INFO_KEY");
      if (result) {
        setUser(JSON.parse(result));
      }
    }
  }, []);
  return (
    <MainLayout>
      <div className="order_list pt-[150px] h-screen">
        {/* <div className="container_all">
          <div className="title">
            <p className="text-3xl font-semibold">Profile</p>
          </div>
          <div className="total flex gap-[20px]">
            <OrderLeft />
            <OrderRight orderList={phoneReducer.orderList} user={user}/>
          </div>
        </div> */}
      </div>
    </MainLayout>
  );
}
