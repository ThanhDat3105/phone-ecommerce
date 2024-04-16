import React from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/interface/product";
import { FaShoppingBag } from "react-icons/fa";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";

interface Props {
  inputFocus: boolean;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  setShow: (value: boolean) => void;
  cartList: CartItem[];
  setShowMenu: (value: boolean) => void;
  showMenu: boolean;
}

export default function HeaderMobile(props: Props) {
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
