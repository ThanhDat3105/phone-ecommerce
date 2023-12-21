"use client";
import MultiCarousel from "@/app/components/muti_carousel/MultiCarousel";
import { Product, Storage } from "@/interface/product";

import { StarEmpty, StarFill } from "@/app/components/icons/icon";
import { formatPrice } from "@/utils/price";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/features/phoneSlice";

interface Props {
  ele: Product | undefined;
}

export default function InfoDetail(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [memoryName, setMemoryName] = useState<string>();
  const [color, setColor] = useState<string>();

  const renderStar = Array.from({ length: 5 }, (_, index) =>
    index < 4 ? (
      <span key={index}>
        <StarFill />
      </span>
    ) : (
      <span key={index}>
        <StarEmpty />
      </span>
    )
  );

  const handleClick = (name: string) => {
    setMemoryName(name);
  };

  const handleClickColor = (hex: string) => {
    setColor(hex);
  };

  const handleAddToCart = () => {
    if (memoryName && color) {
      if (props.ele) {
        dispatch(
          addToCart({
            id_product: props.ele.id_product,
            thumbnail: props.ele.thumbnail,
            name: props.ele.name,
            storage: memoryName,
            color: color,
            price: props.ele.price,
          })
        );
        toast.success("Add to cart successfully");
      }
    } else {
      toast.error("Please enter information");
    }
  };

  return (
    <div className="info_detail flex gap-[75px] mb-10">
      <div className="detail_left w-[50%] pt-6">
        <MultiCarousel image={props.ele?.img} />
      </div>
      <div className="detail_right w-[50%] pt-[75px]">
        <div className="title inline-block">
          <p className="text-3xl font-semibold">{props.ele?.name}</p>
          <div className="rate flex gap-[10px] items-center py-5">
            {renderStar}
            <p className="mt-1">{4} Rate</p>
          </div>
          <div className="separate h-[1px] bg-[#AAAAAA]" />
        </div>
        <div className="price flex items-end gap-[30px] pt-[25px] pb-[40px]">
          <p className="font-semibold text-2xl">
            {formatPrice(Number(props.ele?.price))}đ
          </p>
          <p className="font-light text-base line-through">
            {formatPrice(Number(props.ele?.original_price))}đ
          </p>
        </div>
        <div className="memory">
          <div className="title pb-5">
            <p>Storage</p>
          </div>
          <div className="item flex gap-[30px]">
            {props.ele?.storage.map((ele: Storage) => {
              return (
                <Button
                  onClick={() => handleClick(ele.name)}
                  className={`px-2 w-[60px] max-w-[60px] bg-[#D9D9D9] border-[1px] transition-all duration-200 rounded-[5px] text-[#5D5D5D] hover:bg-[#d9d9d9d4] ${
                    memoryName === ele.name ? " bg-[#000] text-white" : ""
                  }`}
                  key={ele.name}
                >
                  {ele.name}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="color py-[40px]">
          <div className="title pb-5">
            <p>Color</p>
          </div>
          <div className="item flex gap-[25px]">
            {props.ele?.color.map((ele) => {
              return (
                <span
                  onClick={() => handleClickColor(ele.hex)}
                  key={ele.name}
                  className={`max-w-[30px] max-h-[30px] w-[30px] h-[30px] block rounded-full cursor-pointer
                  ${color === ele.hex ? "active border-[5px]" : ""}
                  `}
                  style={{ backgroundColor: `${ele.hex}` }}
                />
              );
            })}
          </div>
        </div>
        <div className="preferential border-[1px] rounded-[10px]">
          <div className="title text-xl font-semibold px-10 py-5">
            <p>Preferential</p>
          </div>
          <div className="separate h-[1px] bg-[#AAAAAA] " />
          <div className="content px-10 pb-5 pt-8">
            <ul className="text-base list-disc flex flex-col gap-[10px]">
              <li>
                Old collection Renew: Discount up to 2 million (Depending on old
                device model, Does not include payment via online portal,
                purchased together) See details
              </li>
              <li>
                Refund if cheaper somewhere else (Within 7 days; only applicable
                at supermarkets) See details
              </li>
              <li>
                Refund 200,000 VND for HOME CREDIT credit card holders when
                paying for orders from 5,000,000 VND (See details)
              </li>
              <li>
                Enter code VNPAYTGDD to get a discount from 50,000 VND to
                200,000 VND (Applicable depending on order value) when paying
                via VNPAY-QR (See details)
              </li>
              <li>
                Enter code VNPAYTAO to get an instant discount of 200K for
                orders from 15 Million, only applies to VNPAY-QR payment at the
                store (See details)
              </li>
              <li>
                Enter code ZLPIP15 for an instant discount of 300K for orders
                from 20 Million, only applicable for payment via ZALOPAY Wallet
                at the store (See details)
              </li>
            </ul>
          </div>
        </div>
        <div className="button_buy mt-[45px] mb-8">
          <Button
            onClick={() => handleAddToCart()}
            className="transition-all duration-300 w-full py-[30px] rounded-[15px] text-xl   font-medium bg-[#000] hover:bg-[#5d5d5d] hover:text-[#fff] border-[#5D5D5D] border-[1px]"
          >
            Add to cart
          </Button>
        </div>
        <div className="buy flex gap-10 mb-8">
          <Button className="transition-all duration-300 w-[50%] py-[30px] rounded-[15px] text-xl border-[1px] border-[#5D5D5D] text-[#5D5D5D] bg-white font-medium hover:bg-[#5D5D5D] hover:text-[white]">
            Installment
          </Button>
          <Button className="transition-all duration-300 w-[50%] py-[30px] rounded-[15px] text-xl border-[1px] border-[#5D5D5D] text-[#5D5D5D] bg-white font-medium hover:bg-[#5D5D5D] hover:text-[white]">
            Trade - In
          </Button>
        </div>
        <div className="hotline border-[1px] border-[#5D5D5D] rounded-[10px] px-10 py-5">
          <ul className="text-base list-disc flex flex-col gap-[10px]">
            <li>
              Product set includes: Box, Instruction book, SIM card, Type C
              cable
            </li>
            <li>Genuine 1 year warranty</li>
            <li>Fast delivery nationwide</li>
            <li>Call to order 1900.9929</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
