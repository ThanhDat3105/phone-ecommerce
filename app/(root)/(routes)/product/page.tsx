"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../../MainLayout";
import ProductLeft from "./product_left/ProductLeft";
import ProductRight from "./product_right/ProductRight";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  fetchListBrandAction,
  fetchListCategoryAction,
  fetchListPhoneAction,
} from "@/redux/features/phoneSlice";

export default function page() {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const fetchListBrand = () => {
    dispatch(fetchListBrandAction());
  };

  const fetchListPhone = () => {
    dispatch(fetchListPhoneAction());
  };

  const fetchListCategory = () => {
    dispatch(fetchListCategoryAction());
  };

  useEffect(() => {
    fetchListBrand();
    fetchListPhone();
    fetchListCategory();
  }, []);

  return (
    <MainLayout>
      <div className="filter pt-[130px] bg-white pb-[130px]">
        <div className="container_all">
          <div className="content flex gap-10">
            <ProductLeft
              setFilterBrand={setFilterBrand}
              setFilterType={setFilterType}
              filterBrand={filterBrand}
              filterType={filterType}
            />
            <ProductRight  filterBrand={filterBrand} filterType={filterType} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
