"use client";

import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../MainLayout";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

import { formatPrice } from "@/utils/price";
import { Button } from "@/components/ui/button";
import TotalProduct from "./components/TotalProduct";
import InfoCheckout from "./components/InfoCheckout";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/interface/user";

export default function page() {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [progress, setProgress] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<number>();

  const scrollToSection = () => {
    const destination = ref.current;

    if (destination) {
      destination.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!progress) {
      setHasScrolled(true);
    }
    if (progress) {
      scrollToSection();
    }
  }, [progress]);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("USER_INFO_KEY");
    if (storedUserInfo) {
      const userInfoObject: User = JSON.parse(storedUserInfo);
      setIdUser(userInfoObject.id_user);
    }
  }, []);

  const totalAmount = phoneReducer.cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <MainLayout>
      <div ref={ref} className="cart py-[115px] bg-white">
        <div className="container_all flex gap-[60px]">
          <div className="left w-[70%]">
            <div className="menu_back flex text-[#5D5D5D] tracking-wider gap-6 pb-[25px]">
              <p
                onClick={() => router.push("/")}
                className="cursor-pointer transition-all duration-300 hover:text-black"
              >
                Home
              </p>
              <IoIosArrowForward className="cursor-pointer" />
              <p className="cursor-pointer text-black transition-all duration-300">
                Shopping Cart
              </p>
            </div>
            <div className="title uppercase text-4xl font-bold tracking-wider">
              shopping cart
            </div>
            <div className="progress flex gap-16 mt-[50px] mb-[70px]">
              <div
                onClick={() => setProgress(false)}
                className={`shopping relative ${
                  progress ? "cursor-pointer" : ""
                }`}
              >
                <div className="content flex items-center gap-[15px]">
                  {!progress ? (
                    <p className="text-xl rounded-full px-4 py-2 font-bold bg-[#444444] text-white w-[45px] h-[45px]">
                      1
                    </p>
                  ) : (
                    <FaCheck className="text-2xl rounded-full p-[12px] font-bold bg-[#444444] text-white w-[45px] h-[45px]" />
                  )}
                  <p className="text-xl font-bold tracking-wider text-[#444444]">
                    Shopping cart
                  </p>
                </div>
                <div
                  className={`separate transition-all duration-300 w-full bottom-[-20px] absolute h-[2px] ${
                    !progress
                      ? "scale-x-[0,5.0,5] bg-[#444444]"
                      : "scale-[0.0,5] bg-[white]"
                  } `}
                />
              </div>
              <div className="checkout relative">
                <div className="content flex items-center gap-[15px]">
                  <p className="text-xl rounded-full px-4 py-2 font-bold bg-[#444444] text-white w-[45px] h-[45px]">
                    2
                  </p>
                  <p className="text-xl font-bold tracking-wider text-[#444444]">
                    Check out
                  </p>
                </div>
                <div
                  className={`separate transition-all duration-300 w-full bottom-[-20px] absolute h-[2px] ${
                    progress
                      ? "scale-x-[0,5.0,5] bg-[#444444]"
                      : "scale-[0.0,5] bg-[white]"
                  } `}
                />
              </div>
            </div>
            {!progress ? <TotalProduct /> : <InfoCheckout idUser={idUser} />}
          </div>
          <div className="right">
            <div className="content p-[30px] mt-48 bg-[#FFFFFF] rounded-[15px] shadow-[0_5px_10px_0_rgb(0,0,0,0.2)]">
              <div className="title">
                <p className="text-xl font-bold text-[#444444]">Cart Summary</p>
              </div>
              <div className="separate h-[1px] my-[15px] bg-[#D5D5D5]" />
              <div className="voucher">
                <p>Voucher</p>
                <div className="input_voucher mt-[15px] relative">
                  <input
                    type="text"
                    placeholder="Add Voucher"
                    className="border-[#AAAAAA] border-[1px] rounded-[10px] py-[6px] pl-[10px] pr-[100px] focus-visible:outline-none"
                  />
                  <div className="separate absolute top-[50%] translate-y-[-50%] right-[26%] h-[80%] w-[1px] bg-[#D5D5D5]" />
                  <IoIosArrowDown className="absolute top-[50%] translate-y-[-50%] right-[31%] cursor-pointer" />
                  <Button className="absolute right-0 bottom-0 h-full rounded-[10px] rounded-tl-none rounded-bl-none bg-transparent text-black font-bold hover:text-white">
                    Submit
                  </Button>
                </div>
              </div>
              <div className="separate h-[1px] my-[15px] bg-[#D5D5D5]" />
              <div className="discount">
                <p className="tracking-wider pb-4">Total</p>
                <div className="total_discount">
                  <div className="text-sm text-[#444444] flex justify-between pb-1">
                    <p>{phoneReducer.cartList.length} Item</p>
                    <p>{formatPrice(Number(totalAmount))}</p>
                  </div>
                  <div className="text-sm text-[#444444] flex justify-between">
                    <p>Discount</p>
                    <p>-0%</p>
                  </div>
                </div>
              </div>
              <div className="separate h-[1px] my-[15px] bg-[#D5D5D5]" />
              <div className="total flex justify-between pb-6">
                <p>Total</p>
                <p>{formatPrice(Number(totalAmount))}đ</p>
              </div>
              <div className="button_checkout ">
                <Button
                  onClick={() => setProgress(true)}
                  className=" bg-[#444444] rounded-[15px] w-full"
                >
                  CHECKOUT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
