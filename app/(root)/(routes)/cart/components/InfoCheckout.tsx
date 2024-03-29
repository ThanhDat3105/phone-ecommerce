"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import visa from "@/public/image/cart/visa 1.png";
import momo from "@/public/image/cart/momo 1.png";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { CartItem, ValueFormOrder } from "@/interface/product";
import { createOrderAction } from "@/redux/features/phoneSlice";
import { User } from "@/interface/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  user: User | undefined;
}

export default function InfoCheckout(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const reducer = useSelector((state: RootState) => state);
  const router = useRouter();
  const [payment_method, setPaymentMethod] = useState<string>();
  const [formOrder, setFormOrder] = useState<ValueFormOrder>({
    values: {
      id_user: Number(props.user?.id_user),
      name: String(props.user?.name),
      phone: "",
      address: "",
      payment_method: payment_method,
      delivery_by: "Shopee Express",
      total: Number(0),
      productItem: [],
    },
  });

  const totalAmount = reducer.phoneReducer.cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (reducer.phoneReducer.cartList) {
      const productItem = reducer.phoneReducer.cartList.map(
        (item: CartItem) => {
          return {
            name: item.name,
            color: item.color,
            price: item.price,
            storage: item.storage,
            quantity: item.quantity,
          };
        }
      );

      setFormOrder((prevFormOrder) => ({
        ...prevFormOrder,
        values: {
          ...prevFormOrder.values,
          productItem,
        },
      }));
    }
  }, [reducer.phoneReducer.cartList]);

  useEffect(() => {
    setFormOrder((prevFormOrder) => ({
      ...prevFormOrder,
      values: {
        ...prevFormOrder.values,
        payment_method: payment_method,
        total: totalAmount,
      },
    }));
  }, [payment_method, totalAmount]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormOrder((prevFormOrder) => ({
      ...prevFormOrder,
      values: {
        ...prevFormOrder.values,
        [name]: value,
      },
    }));
  };

  const handleActive = (name: string) => {
    setPaymentMethod(name);
  };

  const pay = async () => {
    try {
      const result = await dispatch(createOrderAction(formOrder));

      if (result) {
        toast.success("Order placed successfully");
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="info_checkout">
      <p className="text-xl font-bold mb-[40px]">Contact Information</p>
      <div className="name flex gap-[100px] justify-between">
        <input
          type="text"
          placeholder="First Name"
          className="w-full p-5 rounded-[10px] focus-visible:outline-none border-[1px] border-[#444444] placeholder:text-black"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-5 rounded-[10px] focus-visible:outline-none border-[1px] border-[#444444] placeholder:text-black"
        />
      </div>
      <input
        name="phone"
        onChange={handleChange}
        type="text"
        placeholder="Phone Number"
        className="w-full p-5 rounded-[10px] focus-visible:outline-none mt-[30px] mb-10 border-[1px] border-[#444444] placeholder:text-black"
      />
      <p className="text-xl font-bold pb-10">Shipping Address</p>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Address"
        name="address"
        className="w-full p-5 rounded-[10px] focus-visible:outline-none border-[1px] border-[#444444] placeholder:text-black"
      />
      <p className="text-xl font-bold mt-10">Payment Method</p>
      <div className="option_pay flex gap-[35px] mt-[45px] mb-[60px]">
        <div
          onClick={() => handleActive("Visa")}
          className={`image rounded-[10px] h-[60px] px-5  flex items-center justify-center cursor-pointer ${
            payment_method === "Visa"
              ? "shadow-[0_5px_10px_0_rgb(0,0,0,0.4)]"
              : "shadow-none"
          }`}
        >
          <img src={visa.src} alt="" />
        </div>
        <div
          onClick={() => handleActive("Momo")}
          className={`image rounded-[10px]  h-[60px] px-5 bg-white flex items-center justify-center cursor-pointer ${
            payment_method === "Momo"
              ? "shadow-[0_5px_10px_0_rgb(0,0,0,0.4)]"
              : "shadow-none"
          }`}
        >
          <img src={momo.src} alt="" />
        </div>
        <div
          onClick={() => handleActive("Shipcode")}
          className={`image rounded-[10px] h-[60px] px-5  flex items-center justify-center cursor-pointer ${
            payment_method === "Shipcode"
              ? "shadow-[0_5px_10px_0_rgb(0,0,0,0.4)]"
              : "shadow-none"
          }`}
        >
          <p className="font-bold">Ship Code</p>
        </div>
      </div>
      <Button
        onClick={() => pay()}
        type="button"
        placeholder="Place Order"
        className="w-full text-white text-base h-[65px] mt-[30px] rounded-[10px] bg-[#000] hover:opacity-90 focus-visible:outline-none"
      >
        Place Order
      </Button>
    </div>
  );
}
