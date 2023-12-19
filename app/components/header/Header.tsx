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

export default function Header() {
  const [login, setLogin] = useState<boolean>(false);
  const elRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const storedUserInfo = localStorage.getItem("USER_INFO_KEY");
  const [value, setValue] = useState<string>("");
  const [presentHeight, setPresentHeight] = useState<number>(0);
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY || window.pageYOffset;
      setPresentHeight(scrollPosition);
    });
  }

  useEffect(() => {
    if (presentHeight > 0) {
      document.querySelector(".container_header")?.classList.add("scroll");
      document.querySelector(".container_header")?.classList.remove("ani_none");
    } else if (presentHeight === 0) {
      document.querySelector(".container_header")?.classList.remove("scroll");
    }
  }, [presentHeight]);

  useEffect(() => {
    if (storedUserInfo) {
      setLogin(true);
    }
  }, [storedUserInfo]);

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

  const handleLogOut = () => {
    if (storedUserInfo) {
      localStorage.removeItem("USER_INFO_KEY");
      setLogin(false);
      checkHeight(elRef);
      toast.success("Log out successfully");
    }
  };

  return (
    <div className="header fixed w-full z-50 bg-white drop-shadow-md">
      <div className="container_all flex justify-between items-center text-white h-[70px]">
        <div
          onClick={() => router.push("/")}
          className="header_logo cursor-pointer"
        >
          <Logo />
        </div>
        <div className="header_menu flex gap-[55px] text-black">
          <div className="item_menu category flex cursor-pointer relative items-center">
            <div role="button"
              onClick={() => router.push("/product")}
              className="font-normal text-base"
            >
              All Categories
            </div>
          </div>
          <div className="item_menu relative">
            <div role="button" className="font-normal text-base">News</div>
          </div>
          {/* <div className="item_menu relative">
            <p className="font-normal text-base">Service</p>
          </div> */}
        </div>
        <div className="header_info flex gap-[30px]">
          <div
            className={`header_find flex items-center border-b-[2px]  ${
              inputFocus ? "border-[#a5a7ac] border-b-2 " : "border-transparent"
            }`}
          >
            <input
              type="text"
              placeholder="Search Product"
              className="input_find pl-0 text-black focus-visible:outline-none py-[10px] w-[150px]"
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
          </div>
          <div className="header_cart relative">
            <Button
              onClick={() => router.push("/cart")}
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
                <div
                  className="px-5 py-3 flex items-center justify-between cursor-pointer bg-white text-black hover:opacity-80 transition-all duration-300"
                  onClick={() => handleLogOut()}
                >
                  Log out
                  <LogOut size={15} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
