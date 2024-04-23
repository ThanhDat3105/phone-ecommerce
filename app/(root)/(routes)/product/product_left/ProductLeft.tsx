"use client";
import "./productLeft.scss";
import { useState } from "react";
import { Brand } from "@/interface/brand";
import { Category } from "@/interface/category";
import { useRouter } from "next/navigation";
import { useSetting } from "@/hook/useSetting";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
interface Props {
  setFilterBrand: (value: string) => void;
  setFilterType: (value: string) => void;
  filterBrand: string;
  filterType: string;
  screen: boolean;
  brandList: Brand[];
  categoryList: Category[];
}

export default function ProductLeft(props: Props) {
  const router = useRouter();
  const setting = useSetting();
  const [activeIdType, setActiveIdType] = useState<number>(0);
  const [activeIdBrand, setActiveIdBrand] = useState<number>(0);

  const handleActiveBrand = (brand: string, id: number) => {
    if (id !== 0 && activeIdBrand !== id) {
      router.push(`/product?brand=${brand}`);
      setActiveIdBrand(id);
      setActiveIdType(0);
      props.setFilterBrand(brand);
    } else {
      router.push(`/product`);
      setActiveIdBrand(0);
      setActiveIdType(0);
      props.setFilterBrand("");
      props.setFilterType("");
    }
  };

  const handleActiveType = (id: number, type: string) => {
    setActiveIdType(id);
    props.setFilterType(type);
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
                {props.brandList?.length > 0 ? (
                  props.brandList.map((ele: Brand) => {
                    return (
                      <div key={ele.id_brand}>
                        <span
                          onClick={() =>
                            handleActiveBrand(ele.name, ele.id_brand)
                          }
                          className={`${
                            activeIdBrand === ele.id_brand &&
                            props.filterBrand === ele.name
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
                {props.categoryList?.length > 0 ? (
                  props.categoryList.map((ele: Category) => {
                    return (
                      <div key={ele.id_category}>
                        <span
                          onClick={() =>
                            handleActiveType(ele.id_category, ele.name)
                          }
                          className={`${
                            activeIdType === ele.id_category &&
                            props.filterType === ele.name
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
        {props.screen && (
          <Button
            onClick={() => setting.onClose()}
            className="button_close bg-white hover:bg-[#ede9e9] text-black text-2xl absolute top-0 right-0"
          >
            <AiOutlineClose className="btn_close transition-all duration-300 cursor-pointer hover:text-[rgba(0,0,0,0.5)]" />
          </Button>
        )}
      </div>
    </div>
  );
}
