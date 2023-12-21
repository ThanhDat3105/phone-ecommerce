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
  const [activeIdBrand, setActiveIdBrand] = useState<number>(0);
  const [activeIdType, setActiveIdType] = useState<number>(0);
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);

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
        </div>
      </div>
    </div>
  );
}
