
import { CartItem } from "@/src/interface/product";
import React from "react";
import BuyItem from "./BuyItem";

interface Props {
  mobile: boolean;
  cartList: CartItem[];
}

export default function TotalProduct(props: Props) {
  return (
    <>
      {props.mobile ? (
        <div
          className={`body_total overflow-auto pt-5 ${
            props.cartList.length > 1 ? "h-[400px]" : "h-[200px]"
          }`}
        >
          {props.cartList?.map((ele: CartItem) => {
            return (
              <BuyItem mobile={props.mobile} key={ele.id_product} ele={ele} />
            );
          })}
        </div>
      ) : (
        <div className="total_product">
          <div className="header_total text-xl text-[#444444] flex tracking-wider pb-5 mr-6">
            <p className="w-[40%]">Product</p>
            <p className="w-[20%] text-center">Price</p>
            <p className="w-[20%] text-center">Quantity</p>
            <p className="w-[20%] text-center">Subtotal</p>
            <p className=""></p>
          </div>
          <div className="separate h-[1px] bg-black" />
          <div className="body_total max-[1024px]:h-[538px] h-[260px] overflow-auto pt-5">
            {props.cartList?.map((ele: CartItem) => {
              return <BuyItem key={ele.id_product} ele={ele} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
