import React, { ChangeEvent, useEffect } from "react";

import { Button } from "@/src/components/ui/button";
import visa from "@/public/image/cart/visa 1.png";
import momo from "@/public/image/cart/momo 1.png";

import { CartItem, ValueFormOrder } from "@/src/interface/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import orderApiRequest from "@/src/apiRequest/order";

interface Props {
  sessionToken?: string;
  cartList: CartItem[];
  formOrder: ValueFormOrder;
  payment_method: string;
  setFormOrder: (value: React.SetStateAction<ValueFormOrder>) => void;
  setPaymentMethod: (value: string) => void;
}

export default function InfoCheckout(props: Props) {
  const router = useRouter();

  const totalAmount = props.cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    props.setFormOrder((prevFormOrder) => ({
      values: {
        ...prevFormOrder.values,
        payment_method: props.payment_method,
        total: totalAmount,
        productItem: props.cartList,
      },
    }));
  }, [props.payment_method, totalAmount, props.cartList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    props.setFormOrder((prevFormOrder) => ({
      values: {
        ...prevFormOrder.values,
        [name]: value,
      },
    }));
  };

  const handleActive = (name: string) => {
    props.setPaymentMethod(name);
  };

  const pay = async () => {
    try {
      if (props.cartList) {
        const result = await orderApiRequest.createOrderApi(
          props.formOrder.values,
          String(props.sessionToken)
        );
        if (result.payload) {
          toast.success("Order placed successfully");
          router.push("/");
        }
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
          className={`image rounded-[10px] relative h-[60px] px-5  flex items-center justify-center cursor-pointer ${
            props.payment_method === "Visa"
              ? "shadow-[0_5px_10px_0_rgb(0,0,0,0.4)]"
              : "shadow-none"
          }`}
        >
          <Image src={visa.src} alt="image visa" width={100} height={60} />
        </div>
        <div
          onClick={() => handleActive("Momo")}
          className={`image rounded-[10px] relative h-[60px] px-5 bg-white flex items-center justify-center cursor-pointer ${
            props.payment_method === "Momo"
              ? "shadow-[0_5px_10px_0_rgb(0,0,0,0.4)]"
              : "shadow-none"
          }`}
        >
          <Image src={momo.src} alt="image momo" width={100} height={60} />
        </div>
        <div
          onClick={() => handleActive("Shipcode")}
          className={`image rounded-[10px] w-[140px] h-[60px] px-5  flex items-center justify-center cursor-pointer ${
            props.payment_method === "Shipcode"
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
