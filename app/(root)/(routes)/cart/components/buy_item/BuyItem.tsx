`use client`;
import { FaMinus, FaPlus } from "react-icons/fa";
import { formatPrice } from "@/utils/price";

import { useEffect, useState } from "react";
import { CartItem } from "@/interface/product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  deCreaseQuantity,
  inCreaseQuantity,
} from "@/redux/features/phoneSlice";

interface Props {
  ele: CartItem;
}

export default function BuyItem(props: Props) {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [number, setNumber] = useState<number>(1);

  const handleIncrease = () => {
    dispatch(inCreaseQuantity(props.ele));
  };

  const handleDecrease = () => {
    dispatch(deCreaseQuantity(props.ele));
  };

  useEffect(() => {
    const item = phoneReducer.cartList.find(
      (ele: CartItem) => ele.id_product === props.ele.id_product
    );

    if (item) {
      setNumber(item.quantity);
    }
  }, [phoneReducer]);

  return (
    <>
      <div className="item flex">
        <div className="info_item w-[40%] flex gap-[15px]">
          <input type="checkbox" name="" id="" />
          <div className="image flex items-center w-[70px] h-[90px] max-w-[70px] max-h-[90px]">
            <img
              src={props.ele.thumbnail}
              alt="image_item"
              className="w-full"
            />
          </div>
          <div className="info_product flex flex-col gap-[10px]">
            <div className="name">
              <p className="text-base tracking-wider">{props.ele.name}</p>
            </div>
            <div className="memory text-sm tracking-widest text-[#5D5D5D] flex gap-[20px]">
              <p className="w-[60px] max-w-[60px]">Memory:</p>
              <p>{props.ele.storage} GB</p>
            </div>
            <div className="color flex text-sm tracking-widest text-[#5D5D5D] gap-[20px]">
              <p className="w-[60px] max-w-[60px]">Color:</p>
              <p
                style={{ backgroundColor: `${props.ele.color}` }}
                className={`max-w-[20px] max-h-[20px] w-[20px] h-[20px] rounded-full`}
              ></p>
            </div>
          </div>
        </div>
        <div className="info_item w-[20%] flex items-center justify-center">
          <p>{formatPrice(Number(props.ele.price))}đ</p>
        </div>
        <div className="info_item w-[20%] flex justify-center items-center gap-[10px]">
          <p
            onClick={() => handleDecrease()}
            className="cursor-pointer text-base"
          >
            <FaMinus />
          </p>
          <div className="separate w-[1px] bg-[#D5D5D5] h-[15%]" />
          <p className="text-xl w-6 text-center">{number}</p>
          <div className="separate w-[1px] bg-[#D5D5D5] h-[15%]" />
          <p
            onClick={() => handleIncrease()}
            className="cursor-pointer text-base"
          >
            <FaPlus />
          </p>
        </div>
        <div className="info_item w-[20%] flex items-center justify-center">
          <p>{formatPrice(props.ele.price * number)}đ</p>
        </div>
      </div>
      <div className="separate h-[1px] bg-[#D5D5D5] my-5" />
    </>
  );
}
