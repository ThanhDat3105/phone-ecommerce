"use client";
import "./productLeft.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
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
}

export default function ProductLeft(props: Props) {
  const router = useRouter();
  const setting = useSetting();
  const [activeIdType, setActiveIdType] = useState<number>(0);
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);

  const handleActiveType = (id: number, type: string) => {
    setActiveIdType(id);
    props.setFilterType(type);
  };

  const handleActiveBrand = (brand: string) => {
    router.push(`/product?brand=${brand}`);
    setActiveIdType(-1);
    props.setFilterBrand(brand);
  };

  setTimeout(() => {}, 500);

  return (
    <div
      className={`product_left z-50 h-screen absolute xl:w-[20%] w-full bg-white xl:shadow-[0_5px_10px_0_rgba(0,0,0,0.1)] rounded-[10px] pb-12 xl:!translate-x-0 xl:!opacity-[1] ${
        setting.isOpen ? "active" : ""
      }`}
    >
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
                        onClick={() => handleActiveBrand(ele.name)}
                        className={`${
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
        <Button
          onClick={() => setting.onClose()}
          className="button_close bg-white hover:bg-[#ede9e9] text-black text-2xl absolute top-0 right-0"
        >
          <AiOutlineClose className="btn_close transition-all duration-300 cursor-pointer hover:text-[rgba(0,0,0,0.5)]" />
        </Button>
      </div>
    </div>
  );
}
