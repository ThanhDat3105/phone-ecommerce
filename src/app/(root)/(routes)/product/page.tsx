"use client";
import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../MainLayout";
import ProductLeft from "./product_left/ProductLeft";
import ProductRight from "./product_right/ProductRight";
import Loading from "@/src/components/loading/Loading";
import { fetchListPhoneApi } from "@/src/api/service/phone";
import { fetchListBrandApi } from "@/src/api/service/brand";
import { fetchListCategoryApi } from "@/src/api/service/category";
import useSWR from "swr";

export default function ProductPage() {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [screen, setScreen] = useState<boolean>(false);
  const productRef = useRef<HTMLDivElement>(null);

  const brandList = useSWR("brand/brand-list", fetchListBrandApi, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const phoneList = useSWR("product/product-list", fetchListPhoneApi, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const categoryList = useSWR("category/category-list", fetchListCategoryApi, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (Number(productRef.current?.clientWidth) < 1280) {
      setScreen(true);
    }
  }, []);

  return (
    <MainLayout>
      {phoneList?.data === undefined ||
      brandList?.data === undefined ||
      categoryList?.data === undefined ? (
        <div className="min-h-screen">
          <Loading />
        </div>
      ) : (
        <div
          ref={productRef}
          className="filter xl:pt-[130px] min-[768px]:pt-[80px] pt-[70px] bg-white pb-[130px]"
        >
          <div className="container_all xl:!px-[10px] !p-0">
            <div className="content xl:flex gap-10 relative">
              <ProductLeft
                brandList={brandList.data?.data.content}
                categoryList={categoryList.data?.data.content}
                screen={screen}
                setFilterBrand={setFilterBrand}
                setFilterType={setFilterType}
                filterBrand={filterBrand}
                filterType={filterType}
              />
              <ProductRight
                phoneList={phoneList.data?.data.content}
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
