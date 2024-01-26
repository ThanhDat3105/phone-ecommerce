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

export default function ProductPage() {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [menu, setMenu] = useState<boolean>(false);
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
        <div className="filter xl:pt-[130px] min-[768px]:pt-[70px] pt-[60px] bg-white pb-[130px]">
          <div className="container_all xl:!px-[10px] !p-0">
            <div className="content xl:flex gap-10 relative">
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
