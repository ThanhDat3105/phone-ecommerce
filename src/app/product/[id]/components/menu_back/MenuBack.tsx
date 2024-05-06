"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import { PhoneResType } from "@/src/interface/product";

interface Props {
  phone: PhoneResType;
}

export default function MenuBack(props: Props) {
  const router = useRouter();
  return (
    <div className="menu_back flex xl:text-base text-sm text-[#5D5D5D] tracking-wider gap-6">
      <p
        onClick={() => router.push("/")}
        className="cursor-pointer transition-all duration-300 hover:text-black"
      >
        Home
      </p>
      <IoIosArrowForward className="cursor-pointer" />
      <p
        onClick={() =>
          router.push(
            `/product?brand=${props.phone?.categoryBrandMapping?.brand?.name}`
          )
        }
        className="cursor-pointer hover:text-black transition-all duration-300"
      >
        {props.phone?.categoryBrandMapping?.brand?.name}
      </p>
      <IoIosArrowForward className="cursor-pointer" />
      <p className="text-black cursor-pointer">{props.phone?.name}</p>
    </div>
  );
}
