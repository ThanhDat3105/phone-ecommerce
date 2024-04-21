import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CartItem, Product } from "@/interface/product";
import { FaShoppingBag } from "react-icons/fa";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";
import { formatPrice } from "@/utils/price";
import { useRouter } from "next/navigation";

interface Props {
  inputFocus: boolean;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  setShowMenu: (value: boolean) => void;
  setShow: (value: boolean) => void;
  filterPhoneSearch: Product[];
  cartList: CartItem[];
  showMenu: boolean;
  debounceSearch: string;
}

export default function HeaderMobile(props: Props) {
  const router = useRouter();
  const refSearch = useRef<HTMLDivElement>(null);
  const [debounceSearch, setDebounceSearch] = useState<string>("");

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (refSearch.current && !refSearch.current.contains(event.target)) {
        setDebounceSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDebounceSearch(props.debounceSearch);
  }, [props.debounceSearch]);

  return (
    <div className="flex gap-[20px]">
      <div
        className={`header_find relative flex items-center border-b-[2px]  ${
          props.inputFocus
            ? "border-[#a5a7ac] border-b-2 "
            : "border-transparent"
        }`}
      >
        <input
          type="text"
          placeholder="Search Product"
          className="input_find pl-0 text-black focus-visible:outline-none py-[10px] w-[150px]"
          onChange={props.handleChangeSearch}
          onFocus={props.handleFocus}
          onBlur={props.handleBlur}
        />
        <Button
          variant="ghost"
          size={"icon"}
          className="button_Magnifying rounded-[30px] max-h-[30px] duration-300 justify-end hover:bg-transparent"
        >
          <HiOutlineMagnifyingGlass className="text-xl text-black" />
        </Button>
        {debounceSearch !== "" && (
          <div
            ref={refSearch}
            className="active absolute bg-white w-[270px] left-[-40px] h-[350px] top-[146%] rounded-b-[15px] overflow-auto"
          >
            {props.filterPhoneSearch && props.filterPhoneSearch.length > 0 ? (
              props.filterPhoneSearch?.map((ele: Product) => {
                return (
                  <div
                    key={ele.id_product}
                    onClick={() => router.push(`/product/${ele.id_product}`)}
                    className="item_phone py-4 transition-all duration-300 flex cursor-pointer gap-[10px] bg-white px-[5px] hover:bg-[rgb(0,0,0,0.5)]"
                  >
                    <div className="image w-[60px] h-[60px]">
                      <img
                        className="relative top-[50%] translate-y-[-50%]"
                        src={ele.thumbnail}
                        alt={ele.name}
                      />
                    </div>
                    <div className="info flex flex-col justify-center">
                      <div className="name text-xs text-black font-semibold">
                        {ele.name}
                      </div>
                      <div className="price">
                        <div className="price_sale text-sm text-black">
                          {formatPrice(Number(ele.price))}đ
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-black text-xl font-semibold relative top-[50%] left-[50%] text-center translate-x-[-50%] translate-y-[-50%]">
                No suitable phone found
              </div>
            )}
          </div>
        )}
      </div>
      <div className="header_cart relative">
        <Button
          onClick={() => props.setShow(true)}
          size={"icon"}
          className="button_bag rounded-[50%] bg-white text-black transition-all duration-300 hover:bg-black hover:text-white"
        >
          <FaShoppingBag className="icon_bag text-[20px]" />
        </Button>
        {props.cartList.length > 0 && (
          <span className="absolute bg-black text-white rounded-full w-auto text-center text-[12px] left-[22px] top-[3px] leading-[12px] p-[4px] min-w-[20px]">
            {props.cartList.length}
          </span>
        )}
      </div>
      <Button
        onClick={() => props.setShowMenu(!props.showMenu)}
        className="bg-transparent xl:hover:bg-[#D2D2D2] hover:bg-transparent max-[428px]:rounded-full max-[428px]:p-0"
      >
        <IoMenu className="text-black text-3xl cursor-pointer" />
      </Button>
    </div>
  );
}
