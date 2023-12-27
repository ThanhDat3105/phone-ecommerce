"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../../MainLayout";
import ProductLeft from "./product_left/ProductLeft";
import ProductRight from "./product_right/ProductRight";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchListBrandAction,
  fetchListCategoryAction,
  fetchListPhoneAction,
} from "@/redux/features/phoneSlice";
import Loading from "@/app/components/loading/Loading";

export default function page() {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);

  const handleFetchApi = () => {
    dispatch(fetchListBrandAction());
    dispatch(fetchListPhoneAction());
    dispatch(fetchListCategoryAction());
  };

  useEffect(() => {
    handleFetchApi();
  }, []);

  return (
    <MainLayout>
      {phoneReducer.isLoading && <Loading />}
      {phoneReducer.isLoading ? (
        <div className="min-h-[600px]"></div>
      ) : (
        <div className="filter pt-[130px] bg-white pb-[130px]">
          <div className="container_all">
            <div className="content flex gap-10">
              <ProductLeft
                setFilterBrand={setFilterBrand}
                setFilterType={setFilterType}
                filterBrand={filterBrand}
                filterType={filterType}
              />
              <ProductRight
                filterBrand={filterBrand}
                filterType={filterType}
                setFilterBrand={setFilterBrand}
                setFilterType={setFilterType}
              />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
