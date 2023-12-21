"use client";

import React, { useEffect, useRef, useState } from "react";

import { IoMdPerson } from "react-icons/io";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { FaShoppingBag } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import "./header.scss";
import Logo from "../icons/icon/Logo";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatPrice } from "@/utils/price";
import { Product } from "@/interface/product";
import ModalCart from "../modal_cart/ModalCart";

export default function Header() {
  const [login, setLogin] = useState<boolean>(false);
  const elRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [presentHeight, setPresentHeight] = useState<number>(0);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [headerOpen, setHeaderOpen] = useState<boolean>(true);
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY || window.pageYOffset;
      if (scrollPosition > presentHeight) {
        setPresentHeight(scrollPosition);
        closeHeader(headerRef);
      } else {
        setPresentHeight(scrollPosition);
        openHeader(headerRef);
      }
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("USER_INFO_KEY");
      if (user) {
        setLogin(true);
      }
    }
  }, []);

  useEffect(() => {
    if (presentHeight > 0) {
      document.querySelector(".container_header")?.classList.add("scroll");
      document.querySelector(".container_header")?.classList.remove("ani_none");
    } else if (presentHeight === 0) {
      document.querySelector(".container_header")?.classList.remove("scroll");
    }
  }, [presentHeight]);

  const openHeader = (value: React.RefObject<HTMLDivElement> | null) => {
    if (value?.current) {
      value.current.style.height = value.current.scrollHeight + "px";
      setHeaderOpen(true);
    }
  };

  const closeHeader = (value: React.RefObject<HTMLDivElement> | null) => {
    if (value?.current) {
      value.current.style.height = "0px";
      setHeaderOpen(false);
    }
  };

  const checkHeight = (value: React.RefObject<HTMLDivElement> | null) => {
    if (value?.current) {
      const clientHeight = Number(value.current.clientHeight);
      if (clientHeight > 0) {
        value.current.style.height = "0px";
      } else {
        value.current.style.height = value.current.scrollHeight + "px";
      }
    }
  };

  const handleFocus = () => {
    setInputFocus(true);
  };

  const handleBlur = () => {
    setInputFocus(false);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const renderPhoneSearch = () => {
    const filterPhone = phoneReducer?.phoneList?.filter((ele) => {
      return (
        ele.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .toLowerCase()
          .indexOf(value?.toLowerCase()) !== -1
      );
    });

    return (
      <>
        {filterPhone && filterPhone.length > 0 ? (
          filterPhone?.map((ele: Product) => {
            return (
              <div
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
      </>
    );
  };

  const handleLogOut = () => {
    if (login) {
      localStorage.removeItem("USER_INFO_KEY");
      setLogin(false);
      checkHeight(elRef);
      toast.success("Log out successfully");
    }
  };

  const handleClose = () => {
    if (show) {
      setShow(false);
      document.querySelector(".modal_cart")?.classList.add("close");
    }
  };

  return (
    <>
      <div
        ref={headerRef}
        className={`header transition-all duration-100 fixed w-full z-50 bg-white drop-shadow-md ${
          headerOpen ? "" : "overflow-hidden"
        }`}
      >
        <div className="container_all flex justify-between items-center text-white h-[70px]">
          <div
            onClick={() => router.push("/")}
            className="header_logo cursor-pointer"
          >
            <Logo />
          </div>
          <div className="header_menu flex gap-[55px] text-black">
            <div className="item_menu category flex cursor-pointer relative items-center">
              <div
                role="button"
                onClick={() => router.push("/product")}
                className="font-normal text-base"
              >
                All Categories
              </div>
            </div>
            <div className="item_menu relative">
              <div role="button" className="font-normal text-base">
                News
              </div>
            </div>
          </div>
          <div className="header_info flex gap-[30px]">
            <div
              className={`header_find relative flex items-center border-b-[2px]  ${
                inputFocus
                  ? "border-[#a5a7ac] border-b-2 "
                  : "border-transparent"
              }`}
            >
              <input
                type="text"
                placeholder="Search Product"
                className="input_find pl-0 text-black focus-visible:outline-none py-[10px] w-[150px]"
                onChange={handleChangeSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <Button
                variant="ghost"
                size={"icon"}
                className="button_Magnifying rounded-[30px] max-h-[30px] duration-300 justify-end"
              >
                <HiOutlineMagnifyingGlass className="text-xl text-black" />
              </Button>
              {value && (
                <div className="active absolute bg-white w-[270px] left-[-40px] h-[350px] top-[146%] rounded-b-[15px] overflow-auto">
                  {renderPhoneSearch()}
                </div>
              )}
            </div>
            <div className="header_cart relative">
              <Button
                onClick={() => setShow(true)}
                size={"icon"}
                className="button_bag rounded-[50%] bg-white text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                <FaShoppingBag className="icon_bag text-[20px]" />
              </Button>
              {phoneReducer.cartList.length > 0 && (
                <span className="absolute bg-black text-white rounded-full w-auto text-center text-[12px] left-[22px] top-[3px] leading-[12px] p-[4px] min-w-[20px]">
                  {phoneReducer.cartList.length}
                </span>
              )}
            </div>
            <div className="header_user relative">
              <Button
                onClick={() => checkHeight(elRef)}
                size={"icon"}
                className="button_person rounded-[50%] bg-white text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                <IoMdPerson className="icon_person text-2xl" />
              </Button>
              <div
                ref={elRef}
                className="dropdown_user absolute h-0 overflow-hidden w-[150px] top-[140%] rounded-b-[5px] right-[50%] translate-x-[50%] transition-all duration-300"
              >
                {!login ? (
                  <>
                    <div
                      className="px-5 py-3 cursor-pointer bg-white text-black hover:opacity-80 transition-all duration-300"
                      onClick={() => {
                        router.push("/sign_in"), checkHeight(elRef);
                      }}
                    >
                      Login
                    </div>
                    <div
                      className="px-5 py-3 bg-white text-black cursor-pointer hover:opacity-80 transition-all duration-300"
                      onClick={() => {
                        router.push("/sign_up"), checkHeight(elRef);
                      }}
                    >
                      Register
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="px-5 py-3 flex items-center justify-between cursor-pointer bg-white text-black hover:opacity-80 transition-all duration-300"
                      onClick={() => router.push("/order-list")}
                    >
                      Order list
                    </div>
                    <div
                      className="px-5 py-3 flex items-center justify-between cursor-pointer bg-white text-black hover:opacity-80 transition-all duration-300"
                      onClick={() => handleLogOut()}
                    >
                      Log out
                      <LogOut size={15} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => handleClose()}
        className={`bg_opacity ${show ? "show" : "hide"} `}
      />
      <ModalCart show={show} setShow={setShow} handleClose={handleClose} />
    </>
  );
}
