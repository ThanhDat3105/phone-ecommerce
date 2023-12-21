import React from "react";
import { CartItem } from "@/interface/product";
import { formatPrice } from "@/utils/price";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  decreaseQuantity,
  deleteCart,
  increaseQuantity,
} from "@/redux/features/phoneSlice";

interface Props {
  cartItem: CartItem;
}

export default function ItemCart(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const decrease = () => {
    dispatch(decreaseQuantity(props.cartItem));
  };

  const crease = () => {
    dispatch(increaseQuantity(props.cartItem));
  };

  const handleDeleteCart = () => {
    dispatch(deleteCart(props.cartItem.id_product));
  };

  return (
    <div className="item_cart flex justify-between border-b-[1px] border-b-[#dee2e6] py-[30px]">
      <div className="item_left">
        <div className="image_item w-[130px] h-[130px]">
          <img src={props.cartItem.thumbnail} alt={props.cartItem.name} />
        </div>
      </div>
      <div className="item_mid flex flex-col justify-between">
        <div className="info_item flex flex-col gap-[8px]">
          <div className="name_item text-base font-semibold overflow-hidden">
            {props.cartItem.name}
          </div>
          <div className="info_detail items-center flex text-sm tracking-widest text-[#5D5D5D] gap-[20px]">
            <p>{props.cartItem.storage}</p>
            <p
              style={{ backgroundColor: `${props.cartItem.color}` }}
              className={`max-w-[20px] max-h-[20px] w-[20px] h-[20px] rounded-full`}
            ></p>
          </div>
          <div className="price_item text-xs font-semibold tracking-widest">
            {formatPrice(
              Number(props.cartItem.price * props.cartItem.quantity)
            )}
            đ
          </div>
        </div>
        <div className="number_item border-[1px] border-[#dee2e6] rounded-[6px] flex justify-between text-lg text-center w-[120px]">
          <div
            className="decrease w-full cursor-pointer transition-all duration-300 hover:bg-black hover:text-white"
            onClick={() => decrease()}
          >
            -
          </div>
          <div className="number w-full">{props.cartItem.quantity}</div>
          <div
            className="increase w-full cursor-pointer transition-all duration-300 hover:bg-black hover:text-white"
            onClick={() => crease()}
          >
            +
          </div>
        </div>
      </div>
      <div className="item_right flex items-center">
        <div
          className="button_delete w-[26px] h-[26px] bg-[#ff0000] text-white rounded-[6px] flex justify-center items-center opacity-0 transition-all duration-300 cursor-pointer hover:bg-[#ff0000ca]"
          onClick={() => handleDeleteCart()}
        >
          <FaTrash className="trash_delete" />
        </div>
      </div>
    </div>
  );
}
