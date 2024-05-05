"use client";
import "./productLeft.scss";
import { useRef, useState } from "react";
import { Brand } from "@/src/interface/brand";
import { Category } from "@/src/interface/category";
import { useRouter } from "next/navigation";
import { useSetting } from "@/src/hook/useSetting";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/src/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterBrand,
  setFilterType,
} from "@/src/lib/redux/features/phoneSlice";
import { AppDispatch, RootState } from "@/src/lib/redux/store";
import useSWR from "swr";
import { fetchListBrandApi } from "@/src/api/service/brand";
import { fetchListCategoryApi } from "@/src/api/service/category";

export default function ProductLeft() {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const setting = useSetting();
  // const windowSize = useRef([window.innerWidth]);
  const [activeIdType, setActiveIdType] = useState<number>(0);
  const [activeIdBrand, setActiveIdBrand] = useState<number>(0);

  const handleActiveBrand = (brand: string, id: number) => {
    if (id !== 0 && activeIdBrand !== id) {
      router.push(`/product?brand=${brand}`);
      setActiveIdBrand(id);
      setActiveIdType(0);
      dispatch(setFilterBrand(brand));
    } else {
      router.push(`/product`);
      setActiveIdBrand(0);
      setActiveIdType(0);
      dispatch(setFilterBrand(""));
      dispatch(setFilterType(""));
    }
  };

  const handleActiveType = (id: number, type: string) => {
    setActiveIdType(id);
    dispatch(setFilterType(type));
  };

  const skeletonItem = () => {
    return (
      <div className="relative">
        <div
          className={`skeleton h-[18.4px] w-[176px] item bg-[#FFFFFF] rounded-[20px] `}
        ></div>
      </div>
    );
  };

  const brandList = useSWR("brand/brand-list", fetchListBrandApi, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const categoryList = useSWR("category/category-list", fetchListCategoryApi, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <div
      className={`product_left z-50 h-screen xl:h-fit absolute xl:w-[20%] w-full bg-white xl:shadow-[0_5px_10px_0_rgba(0,0,0,0.1)] rounded-[10px] pb-12 xl:!translate-x-0 xl:!opacity-[1] ${
        setting.isOpen ? "active" : ""
      }`}
    >
      <div className="content">
        <div className="filter_collapse pt-5 px-5">
          <div className="company">
            <div title="brand">
              <div className="collapse_title flex justify-between items-center font-bold">
                <h5 className="text-lg">Brand</h5>
              </div>
              <div className="collapse_check pl-5 py-5 flex flex-col gap-[10px] transition-all duration-500 overflow-hidden tracking-widest">
                {brandList?.data?.data.content.length > 0 ? (
                  brandList?.data?.data.content.map((ele: Brand) => {
                    return (
                      <div key={ele.id_brand}>
                        <span
                          onClick={() =>
                            handleActiveBrand(ele.name, ele.id_brand)
                          }
                          className={`${
                            activeIdBrand === ele.id_brand &&
                            phoneReducer.filterBrand === ele.name
                              ? "font-bold cursor-pointer"
                              : "font-normal cursor-pointer"
                          }`}
                        >
                          {ele.name}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col gap-[10px]">
                    {skeletonItem()}
                    {skeletonItem()}
                    {skeletonItem()}
                    {skeletonItem()}
                    {skeletonItem()}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="separate" />
          <div className="type pt-5">
            <div>
              <div className="collapse_title flex justify-between items-center font-bold">
                <h5 className="text-lg">Type</h5>
              </div>
              <div className="collapse_check pl-5 py-5 flex flex-col gap-[10px] transition-all duration-500 overflow-hidden tracking-widest">
                {categoryList?.data?.data.content.length > 0 ? (
                  categoryList?.data?.data.content.map((ele: Category) => {
                    return (
                      <div key={ele.id_category}>
                        <span
                          onClick={() =>
                            handleActiveType(ele.id_category, ele.name)
                          }
                          className={`${
                            activeIdType === ele.id_category &&
                            phoneReducer.filterType === ele.name
                              ? "font-bold cursor-pointer"
                              : "font-normal cursor-pointer"
                          }`}
                        >
                          {ele.name}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col gap-[10px]">
                    {skeletonItem()}
                    {skeletonItem()}
                    {skeletonItem()}
                    {skeletonItem()}
                    {skeletonItem()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* {windowSize.current[0] <= 1200 && (
          <Button
            onClick={() => setting.onClose()}
            className="button_close bg-white hover:bg-[#ede9e9] text-black text-2xl absolute top-0 right-0"
          >
            <AiOutlineClose className="btn_close transition-all duration-300 cursor-pointer hover:text-[rgba(0,0,0,0.5)]" />
          </Button>
        )} */}
      </div>
    </div>
  );
}
