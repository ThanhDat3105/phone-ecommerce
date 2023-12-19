"use client";

import { formatPrice } from "@/utils/price";

import "./itemProduct.scss";
import { useEffect, useState } from "react";

import { FaShoppingBag } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Product } from "@/interface/product";

interface Props {
  ele: Product;
  value?: string;
}

export default function ItemProduct(props: Props) {
  const router = useRouter();

  return (
    <div
      className={`item overflow-hidden cursor-pointer bg-[#FFFFFF] rounded-[20px] shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] px-7 pb-[30px] relative transition-all duration-300 xl:mb-0 xl:max-w-none  md:max-w-[300px] ml-auto mr-auto md:mb-7 hover:scale-[1.03] hover:shadow-[0_5px_10px_0_rgba(0,0,0,0.3)]"
      }`}
      onClick={() => router.push(`/product/${props.ele.id_product}`)}
    >
      <div className="item_top pb-6 md:flex md:justify-center max-w-[210px] max-h-[275px] w-[210px] h-[275px]">
        <div className="image">
          <img
            src={props.ele.thumbnail}
            alt="iphone"
            className="relative top-[50%] translate-y-[-50%]"
          />
        </div>
      </div>
      <div className="item_bottom">
        <div className="title_item pb-6 text-center">
          <h1 className="text-base">{props.ele.name}</h1>
          <div className="flex justify-center gap-1 items-center">
            <h1>{props.ele.storage[0].name}</h1>
          </div>
        </div>
        <div className="price relative py-[5px] border-[1px] border-solid border-[#D5D5D5] rounded-[30px]">
          <div className="price_all overflow-hidden flex justify-center gap-[10px]">
            <div className="price_sale text-base">
              {formatPrice(props.ele.price)}đ
            </div>
            <div className="original_price text-xs flex items-end text-[#B9B9B9]">
              <del>{formatPrice(props.ele.original_price)}đ</del>
            </div>
          </div>
        </div>
      </div>
      {/* {hoverSlider ? (
        <div className="sale_off flex justify-between absolute w-full top-0 left-0 ">
          <div className="status rounded-tl-[20px] rounded-br-[20px] bg-black px-[6px] py-[6px] text-white transition-all duration-300">
            New
          </div>
          <div className="reduced_price rounded-tr-[20px] rounded-bl-[20px] bg-[#D9D9D9] px-[6px] py-[6px] transition-all duration-300">
            -13%
          </div>
        </div>
      ) : (
        ""
      )}
      {hoverSlider ? (
        <div className="info_item absolute w-full left-0 bottom-[-60%] ">
          <div className="container_info bg-[#FFFFFF] rounded-b-[15px] text-center pb-[20px]">
            <div className="info_top">
              <div className="title text-base py-[15px]">{props.ele.name}</div>
            </div>
            <div className="separate w-[90%] h-[1px] bg-black relative left-[50%] translate-x-[-50%] " />
            <div className="info_middle flex flex-col gap-[5px] py-5">
              <div className="inch">
                <p className="text-lg font-semibold tracking-widest">6,7"</p>
              </div>
              <div className="screen ">
                <p className="text-sm">Super Retina XDR</p>
              </div>
              <div className="chip">
                <p className="text-sm">Apple A15 Bionic</p>
              </div>
            </div>
            <div className="price_sale text-base flex justify-evenly items-center">
              <div className="border-[1px] rounded-[30px] border-solid border-[#D5D5D5] py-1 px-3">
                {formatPrice(props.ele.price)}đ
              </div>
              <div className="info_bottom">
                <Button className="rounded-[50%] p-2 h-auto">
                  <FaShoppingBag className="text-[22px] text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
}
