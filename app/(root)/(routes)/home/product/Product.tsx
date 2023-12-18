"use client";
import React, { useEffect } from "react";
import { Product } from "@/interface/product";
import ListItemProduct from "@/app/components/ListItemProduct/ListItemProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchListBrandAction, fetchListPhoneAction } from "@/redux/features/phoneSlice";

export default function Product() {
  const dispatch = useDispatch<AppDispatch>();
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);

  const fetchListBrand = () => {
    dispatch(fetchListBrandAction());
  };

  const fetchListPhone = () => {
    dispatch(fetchListPhoneAction());
  };

  useEffect(() => {
    fetchListBrand();
    fetchListPhone();
  }, []);

  const filterPhoneHome = (id: number) => {
    const result = phoneReducer.phoneList.filter(
      (ele: Product) => ele.categoryBrandMapping.id_brand === id
    );
    return result;
  };

  return (
    <div className="product pt-[45px] pb-[20px]">
      <div className="container_all flex flex-col gap-[50px]">
        <ListItemProduct title="Iphone" ele={filterPhoneHome(6).slice(0, 4)} />
        <ListItemProduct title="Samsung" ele={filterPhoneHome(5).slice(0, 4)} />
        <ListItemProduct title="Vivo" ele={filterPhoneHome(7).slice(0, 4)} />
        <ListItemProduct title="Oppo" ele={filterPhoneHome(8).slice(0, 4)} />
      </div>
    </div>
  );
}
