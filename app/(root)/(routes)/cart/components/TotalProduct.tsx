import BuyItem from "@/app/(root)/(routes)/cart/components/buy_item/BuyItem";
import { CartItem, Product } from "@/interface/product";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

export default function TotalProduct() {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  return (
    <div className="total_product">
      <div className="header_total text-xl text-[#444444] flex tracking-wider pb-5">
        <p className="w-[40%]">Product</p>
        <p className="w-[20%] text-center">Price</p>
        <p className="w-[20%] text-center">Quantity</p>
        <p className="w-[20%] text-center">Subtotal</p>
      </div>
      <div className="separate h-[1px] bg-black" />
      <div className="body_total pt-5">
        {phoneReducer.cartList?.map((ele: CartItem) => {
          return <BuyItem key={ele.id_product} ele={ele} />;
        })}
      </div>
    </div>
  );
}
