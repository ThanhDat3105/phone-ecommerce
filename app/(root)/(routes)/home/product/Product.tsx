"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/interface/product";
import ListItemProduct from "@/app/components/ListItemProduct/ListItemProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchListBrandAction,
  fetchListPhoneAction,
} from "@/redux/features/phoneSlice";
import Loading from "@/app/components/loading/Loading";

export default function Product() {
  const dispatch = useDispatch<AppDispatch>();
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);

  const handleFetchApi = () => {
    dispatch(fetchListBrandAction());
    dispatch(fetchListPhoneAction());
  };

  useEffect(() => {
    handleFetchApi();
  }, []);

  const filterPhoneHome = (id: number) => {
    const result = phoneReducer?.phoneList?.filter(
      (ele: Product) => ele.categoryBrandMapping.id_brand === id
    );
    return result;
  };

  return (
    <>
      {phoneReducer.isLoading && <Loading />}
      {phoneReducer.isLoading ? (
        <div className="min-h-[600px]"></div>
      ) : (
        <div className="product pt-[45px] pb-[20px]">
          <div className="container_all flex flex-col gap-[50px]">
            <ListItemProduct
              title="Iphone"
              ele={filterPhoneHome(6)?.slice(0, 4)}
            />
            <ListItemProduct
              title="Samsung"
              ele={filterPhoneHome(5)?.slice(0, 4)}
            />
            <ListItemProduct
              title="Vivo"
              ele={filterPhoneHome(7)?.slice(0, 4)}
            />
            <ListItemProduct
              title="Oppo"
              ele={filterPhoneHome(8)?.slice(0, 4)}
            />
          </div>
        </div>
      )}
    </>
  );
}
