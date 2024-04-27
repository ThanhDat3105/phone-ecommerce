"use client";
import React, { useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";
import emptyCart from "@/public/empty-cart.png";

import "./modalCart.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/src/lib/redux/store";
import { CartItem } from "@/src/interface/product";
import { Button } from "@/src/components/ui/button";
import ItemCart from "./ItemCart";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/src/utils/price";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
  handleClose: () => void;
}

export default function ModalCart(props: Props) {
  const router = useRouter();
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const totalAmount = phoneReducer.cartList?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (props.show === true) {
      document.querySelector(".modal_cart")?.classList.remove("close");
      document.querySelector(".modal_cart")?.classList.add("show");
    } else {
      document.querySelector(".modal_cart")?.classList.remove("show");
    }
  }, [props.show]);

  return (
    <div className={`modal_cart fixed w-full z-[101] translate-x-[1540px]`}>
      <div className="container_modal w-full absolute max-w-[420px] right-0 top-0 h-screen">
        <div className="modal_all max-w-[420px] ml-auto mr-auto bg-white px-[30px] rounded-l-[6px] h-full">
          <div className="button_close py-[15px] text-2xl">
            <AiOutlineClose
              className="btn_close transition-all duration-300 cursor-pointer hover:text-[rgba(0,0,0,0.5)]"
              onClick={() => props.handleClose()}
            />
          </div>
          <h3 className="text-3xl font-semibold text-center">
            Shopping cart list
          </h3>
          {phoneReducer.cartList.length !== 0 ? (
            <div className="item_all pt-7 h-[70%] overflow-auto">
              {phoneReducer.cartList.map((ele: CartItem) => {
                return <ItemCart key={ele.id_product} cartItem={ele} />;
              })}
            </div>
          ) : (
            <div className="empty_cart h-[70%] relative">
              <img
                src={emptyCart.src}
                alt="emptyCart"
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              />
            </div>
          )}
          <p className="mt-5 flex justify-end font-semibold">
            Total: {formatPrice(Number(totalAmount))}đ
          </p>
          <div className="button_checkout mt-5 flex justify-center">
            <Button
              onClick={() => router.push("/cart")}
              className="text-xl w-full"
            >
              Go to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
