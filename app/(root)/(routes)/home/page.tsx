"use client";
import React, { useEffect } from "react";
import "./home.scss";
import Banner from "./banner/Banner";
import Brand from "./brand/Brand";
import MainLayout from "../../MainLayout";
import Product from "./product/Product";
import News from "./news/News";
import Loading from "@/app/components/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchListBrandAction,
  fetchListPhoneAction,
} from "@/redux/features/phoneSlice";

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
            <Product />
            <News />
          </div>
        </MainLayout>
      )}
    </>
  );
}
