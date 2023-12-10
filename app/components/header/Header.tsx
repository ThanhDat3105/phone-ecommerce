"use client";

import React, { useEffect, useState } from "react";

import logo from "@/public/image/header/logo.png";

import { IoMdPerson } from "react-icons/io";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { FaShoppingBag } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";

import "./header.scss";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [value, setValue] = useState<string>("");
  const [presentHeight, setPresentHeight] = useState<number>(0);

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

  return (
    <div className="header fixed w-full mt-[10px] z-50">
      <div className="container_all ">
        <div className="container_header bg-black max-w-[1500px] mr-auto ml-auto rounded-[50px]">
          <div className="header_frame flex justify-between items-center text-white px-[45px] h-[60px] max-h-[60px]">
            <div className="header_logo cursor-pointer">
              <img src={logo.src} alt="logo" />
            </div>
            <div className="header_menu flex gap-[55px]">
              <div className="item_menu category flex cursor-pointer relative items-center, gap-[10px]">
                <TbMenuDeep className="icon_menu text-[20px] scale-x-[-1]" />
                <p className="font-normal text-[20px]">All Categories</p>
              </div>
              <div className="item_menu relative">
                <p className="font-normal text-[20px]">News</p>
              </div>
              <div className="item_menu relative">
                <p className="font-normal text-[20px]">Service</p>
              </div>
            </div>
            <div className="header_info flex gap-[30px]">
              <div className=" header_find relative flex items-center">
                <input
                  type="text"
                  placeholder="Search Product"
                  className="input_find rounded-[30px] p-[6px] text-black pl-3 focus-visible:outline-none py-[10px]"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Button
                  size={"icon"}
                  className="button_Magnifying rounded-[30px] max-h-[30px] absolute right-[2%] top-[50%] translate-y-[-50%] duration-[300ms]"
                >
                  <HiOutlineMagnifyingGlass className="text-xl" />
                </Button>
              </div>
              <div className="header_user">
                <Button
                  size={"icon"}
                  className="button_person rounded-[50%] bg-white text-black transition-all duration-300 hover:bg-black hover:text-white"
                >
                  <IoMdPerson className="icon_person text-2xl" />
                </Button>
              </div>
              <div className="header_cart">
                <Button
                  size={"icon"}
                  className="button_bag rounded-[50%] bg-white text-black transition-all duration-300 hover:bg-black hover:text-white"
                >
                  <FaShoppingBag className="icon_bag text-[20px]" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
