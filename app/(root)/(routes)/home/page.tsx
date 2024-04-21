"use client";
import React, { useEffect } from "react";
import Banner from "./banner/Banner";
import Brand from "./brand/Brand";
import MainLayout from "../../MainLayout";
import News from "./news/News";
import Loading from "@/components/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchListBrandAction,
  fetchListPhoneAction,
} from "@/redux/features/phoneSlice";
import ProductHome from "./product/ProductHome";
import { Product } from "@/interface/product";

export default function HomePage() {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleFetchApi = () => {
    dispatch(fetchListBrandAction());
    dispatch(fetchListPhoneAction());
  };

  useEffect(() => {
    handleFetchApi();
  }, []);

  const filterPhoneHome = (brand: string) => {
    const result = phoneReducer.phoneList.filter(
      (ele: Product) => ele.categoryBrandMapping.brand.name === brand
    );
    return result;
  };

  return (
    <>
      {phoneReducer.isLoading && <Loading />}
      {phoneReducer.isLoading ? (
        <div className="min-h-[600px]"></div>
      ) : (
        <MainLayout>
          <div className="home bg-white">
            <Banner />
            <Brand />
            <ProductHome phoneList={phoneReducer.phoneList} />
            <News />
          </div>
        </MainLayout>
      )}
    </>
  );
}
