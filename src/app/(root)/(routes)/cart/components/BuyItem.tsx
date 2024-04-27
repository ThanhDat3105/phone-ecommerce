`use client`;
import { FaMinus, FaPlus } from "react-icons/fa";
import { formatPrice } from "@/src/utils/price";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CartItem } from "@/src/interface/product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/redux/store";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteCart,
} from "@/src/lib/redux/features/phoneSlice";

interface Props {
  ele: CartItem;
  mobile?: boolean;
}

export default function BuyItem(props: Props) {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [number, setNumber] = useState<number>(1);

  const handleIncrease = () => {
    dispatch(increaseQuantity(props.ele));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(props.ele));
  };

  const handleDeleteCart = () => {
    dispatch(deleteCart(props.ele.id_product));
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
      {props.mobile ? (
        <div className="item flex justify-between pb-10 items-center">
          <div className="item_left">
            <div className="image flex items-center w-[70px]">
              <img
                src={props.ele.thumbnail}
                alt="image_item"
                className="w-full"
              />
            </div>
          </div>
          <div className="item_right flex flex-col gap-[10px]">
            <div className="info_product flex flex-col gap-[10px]">
              <div className="name">
                <p className="text-base tracking-wider truncate w-[200px]">
                  {props.ele.name}
                </p>
              </div>
              <div className="storage text-sm tracking-widest text-[#5D5D5D] flex gap-[20px]">
                <p className="w-[60px] max-w-[60px]">Storage:</p>
                <p>{props.ele.storage}</p>
              </div>
              <div className="color flex text-sm tracking-widest text-[#5D5D5D] gap-[20px]">
                <p className="w-[60px] max-w-[60px]">Color:</p>
                <p
                  style={{ backgroundColor: `${props.ele.color}` }}
                  className={`max-w-[20px] max-h-[20px] w-[20px] h-[20px] rounded-full`}
                ></p>
              </div>
            </div>
            <div className="info_item flex justify-start items-center gap-[10px]">
              <p
                onClick={() => handleDecrease()}
                className="cursor-pointer text-base"
              >
                <FaMinus />
              </p>
              <p className="text-xl w-6 text-center">{number}</p>
              <p
                onClick={() => handleIncrease()}
                className="cursor-pointer text-base"
              >
                <FaPlus />
              </p>
            </div>
            <div className="info_item flex items-center justify-end">
              <p>{formatPrice(props.ele.price * number)}đ</p>
            </div>
          </div>
          <div className="flex items-center">
            <div
              className="button_delete w-[26px] h-[26px] bg-black text-white rounded-[6px] flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-[#ff0000ca]"
              onClick={() => handleDeleteCart()}
            >
              <FaTrash className="trash_delete" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="item flex">
            <div className="info_item w-[40%] flex gap-[15px] items-center">
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
                <div className="storage text-sm tracking-widest text-[#5D5D5D] flex gap-[20px]">
                  <p className="w-[60px] max-w-[60px]">Storage:</p>
                  <p>{props.ele.storage}</p>
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
            <div className="flex items-center">
              <div
                className="button_delete w-[26px] h-[26px] bg-black text-white rounded-[6px] flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-[#ff0000ca]"
                onClick={() => handleDeleteCart()}
              >
                <FaTrash className="trash_delete" />
              </div>
            </div>
          </div>
          <div className="separate h-[1px] bg-[#D5D5D5] my-5" />
        </>
      )}
    </>
  );
}
