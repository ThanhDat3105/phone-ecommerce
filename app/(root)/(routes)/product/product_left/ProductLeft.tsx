"use client";
import "./productLeft.scss";
import { useState } from "react";
import { formatPrice } from "@/utils/price";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Brand } from "@/interface/brand";
import { Category } from "@/interface/category";

interface Props {
  setFilterBrand: (value: string) => void;
  setFilterType: (value: string) => void;
  filterBrand: string;
  filterType: string;
}

export default function ProductLeft(props: Props) {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [activeIdBrand, setActiveIdBrand] = useState<number>(0);
  const [activeIdType, setActiveIdType] = useState<number>(0);
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);

  const onChangeComplete = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinPrice(value[0]);
      setMaxPrice(value[1]);
    }
  };

  const handleActiveType = (id: number, type: string) => {
    setActiveIdType(id);
    props.setFilterType(type);
  };

  const handleActiveBrand = (id: number, brand: string) => {
    setActiveIdType(-1);
    setActiveIdBrand(id);
    props.setFilterBrand(brand);
  };

  return (
    <div className="filter_left absolute w-[20%] bg-white shadow-[0_5px_10px_0_rgba(0,0,0,0.1)] rounded-[10px] pb-12">
      <div className="content">
        <div className="filter_collapse pt-5 px-5">
          <div className="company">
            <div title="brand">
              <div className="collapse_title flex justify-between items-center font-bold cursor-pointer">
                <h5 className="text-lg">Brand</h5>
              </div>
              <div className="collapse_check pl-5 py-5 flex flex-col gap-[10px] transition-all duration-500 overflow-hidden cursor-pointer tracking-widest">
                {phoneReducer.brandList.map((ele: Brand) => {
                  return (
                    <div key={ele.id_brand}>
                      <span
                        onClick={() =>
                          handleActiveBrand(ele.id_brand, ele.name)
                        }
                        className={`${
                          activeIdBrand === ele.id_brand &&
                          props.filterBrand === ele.name
                            ? "font-bold"
                            : "font-normal"
                        }`}
                      >
                        {ele.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="separate" />
          <div className="type pt-5">
            <div>
              <div className="collapse_title flex justify-between items-center font-bold cursor-pointer">
                <h5 className="text-lg">Type</h5>
              </div>
              <div className="collapse_check pl-5 py-5 flex flex-col gap-[10px] transition-all duration-500 overflow-hidden cursor-pointer tracking-widest">
                {phoneReducer.categoryList.map((ele: Category) => {
                  return (
                    <div key={ele.id_category}>
                      <span
                        onClick={() =>
                          handleActiveType(ele.id_category, ele.name)
                        }
                        className={`${
                          activeIdType === ele.id_category &&
                          props.filterType === ele.name
                            ? "font-bold"
                            : "font-normal"
                        }`}
                      >
                        {ele.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="separate" />
          <div className="price pt-5">
            <div className="flex flex-col gap-5">
              <div className="collapse_title flex justify-between items-center font-bold cursor-pointer">
                <h5 className="text-lg">Price</h5>
              </div>
              <div className="flex justify-between gap-[10px] items-center">
                <div className="border-[1px] rounded-[6px] border-solid border-[#AAAAAA] text-center w-[48%] py-[2px]">
                  <p>{formatPrice(minPrice * 100)}đ</p>
                </div>
                <div className="separate_price bg-black h-[1px] w-[4%]" />
                <div className="border-[1px] rounded-[6px] border-solid border-[#AAAAAA] text-center w-[48%] py-[2px]">
                  <p>{formatPrice(maxPrice * 100)}đ</p>
                </div>
              </div>
              <div className="collapse_check px-2 flex flex-col gap-[10px] transition-all duration-500 overflow-hidden cursor-pointer tracking-widest">
                {/* <Slider
                  range
                  step={10}
                  defaultValue={[20, 50]}
                  onChangeComplete={onChangeComplete}
                  max={1000000}
                  min={0}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
