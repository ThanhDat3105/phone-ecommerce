"use client";

import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../MainLayout";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

import { formatPrice } from "@/utils/price";
import { Button } from "@/components/ui/button";
import TotalProduct from "./components/TotalProduct";
import InfoCheckout from "./components/InfoCheckout";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/interface/user";
import { toast } from "sonner";
import EmptyCart from "@/public/image/cart/empty-cart.png";
import { CartItem, ValueFormOrder } from "@/interface/product";

export default function CartPage() {
  const cartList = useSelector(
    (state: RootState) => state.phoneReducer.cartList
  );
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [progress, setProgress] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [payment_method, setPaymentMethod] = useState<string>("");
  const [formOrder, setFormOrder] = useState<ValueFormOrder>({
    values: {
      id_user: 0,
      name: "",
      phone: "",
      address: "",
      payment_method: "",
      delivery_by: "Shopee Express",
      total: 0,
      productItem: [],
    },
  });

  const scrollToSection = () => {
    const destination = ref.current;

    if (destination) {
      destination.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (progress) {
      scrollToSection();
    }
  }, [progress]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLocalStorage = localStorage.getItem("USER_INFO_KEY");
      if (userLocalStorage) {
        const userInfoObject: User = JSON.parse(userLocalStorage);
        setUser(userInfoObject);
      }
    }

    if (Number(ref.current?.clientWidth) < 1280) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormOrder((formOrder) => ({
        values: {
          ...formOrder.values,
          id_user: user.id_user,
          name: user.name,
          address: user.address,
          phone: user.phone,
        },
      }));
    }
  }, [user]);

  const totalAmount = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("USER_INFO_KEY");
      if (user) {
        setProgress(true);
      } else {
        toast.success("Login to continue");
        router.push(`/sign_in?urlBack=/cart`);
      }
    }
  };

  return (
    <MainLayout>
      {cartList?.length > 0 ? (
        <div ref={ref} className="cart xl:py-[115px] py-[90px] bg-white">
          <div className="container_all xl:flex gap-[60px]">
            <div className="left xl:w-[65%]">
              <div className="menu_back flex text-[#5D5D5D] tracking-wider gap-6 pb-[25px]">
                <p
                  onClick={() => router.push("/")}
                  className="cursor-pointer transition-all duration-300 hover:text-black"
                >
                  Home
                </p>
                <IoIosArrowForward className="cursor-pointer" />
                <p className="cursor-pointer text-black transition-all duration-300">
                  Shopping Cart
                </p>
              </div>
              <div className="title uppercase xl:text-2xl text-xl font-bold tracking-wider">
                shopping cart
              </div>
              <div className="progress flex md:gap-16 max-[768px]:justify-normal max-[767px]:justify-between xl:mt-[50px] mt-[30px] xl:mb-[70px] mb-[50px]">
                <div
                  onClick={() => setProgress(false)}
                  className={`shopping relative ${
                    progress ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="content flex items-center gap-[10px]">
                    {!progress ? (
                      <p className="text-lg rounded-full p-2 text-center font-bold bg-[#444444] text-white w-[40px] h-[40px]">
                        1
                      </p>
                    ) : (
                      <FaCheck className="text-lg rounded-full p-2 text-center font-bold bg-[#444444] text-white w-[40px] h-[40px]" />
                    )}
                    <p className="text-lg font-bold tracking-wider text-[#444444]">
                      Shopping cart
                    </p>
                  </div>
                  <div
                    className={`separate transition-all duration-300 w-full bottom-[-20px] absolute h-[2px] ${
                      !progress
                        ? "scale-x-[0,5.0,5] bg-[#444444]"
                        : "scale-[0.0,5] bg-[white]"
                    } `}
                  />
                </div>
                <div className="checkout relative">
                  <div
                    className={`content ${
                      !progress ? "opacity-60" : "opacity-100"
                    }  flex items-center gap-[10px]`}
                  >
                    <p className="text-lg rounded-full p-2 text-center font-bold bg-[#444444] text-white w-[40px] h-[40px]">
                      2
                    </p>
                    <p className="text-lg font-bold tracking-wider text-[#444444]">
                      Check out
                    </p>
                  </div>
                  <div
                    className={`separate transition-all duration-300 w-full bottom-[-20px] absolute h-[2px] ${
                      progress
                        ? "scale-x-[0,5.0,5] bg-[#444444]"
                        : "scale-[0.0,5] bg-[white]"
                    }`}
                  />
                </div>
              </div>
              {!progress ? (
                <TotalProduct mobile={mobile} cartList={cartList} />
              ) : (
                <InfoCheckout
                  cartList={cartList}
                  formOrder={formOrder}
                  setFormOrder={setFormOrder}
                  payment_method={payment_method}
                  setPaymentMethod={setPaymentMethod}
                />
              )}
            </div>
            {!progress ? (
              <div className="right">
                <div className="content p-[30px] xl:mt-48 bg-[#FFFFFF] rounded-[15px] shadow-[0_5px_10px_0_rgb(0,0,0,0.2)]">
                  <div className="title">
                    <p className="text-xl font-bold text-[#000]">
                      Cart Summary
                    </p>
                  </div>
                  <div className="separate h-[1px] my-[15px] bg-[#D5D5D5]" />
                  <div className="voucher">
                    <p className="font-semibold">Voucher</p>
                    <div className="input_voucher mt-[15px] relative">
                      <input
                        type="text"
                        placeholder="Add Voucher"
                        className="border-[#AAAAAA] border-[1px] rounded-[10px] py-[6px] pl-[10px] pr-[100px] focus-visible:outline-none"
                      />
                      <div className="separate absolute top-[50%] translate-y-[-50%] right-[26%] lg:right-[26%] min-[500px]:right-[63%] h-[80%] w-[1px] bg-[#D5D5D5]" />
                      <IoIosArrowDown className="absolute top-[50%] translate-y-[-50%] right-[31%] lg:right-[31%] min-[500px]:right-[65%] cursor-pointer" />
                      <Button className="absolute right-0 lg:right-0 min-[500px]:right-1/2 bottom-0 h-full rounded-[10px] rounded-tl-none rounded-bl-none bg-transparent text-black font-bold hover:text-white">
                        Submit
                      </Button>
                    </div>
                  </div>
                  <div className="separate h-[1px] my-[15px] bg-[#D5D5D5]" />
                  <div className="discount">
                    <div className="total_discount">
                      <div className="text-sm text-[#444444] flex justify-between pb-1">
                        <p>{cartList.length} Item</p>
                        <p>{formatPrice(Number(totalAmount))}</p>
                      </div>
                      <div className="text-sm text-[#444444] flex justify-between">
                        <p>Discount</p>
                        <p>-0%</p>
                      </div>
                    </div>
                  </div>
                  <div className="separate h-[1px] my-[15px] bg-[#D5D5D5]" />
                  <div className="total flex justify-between pb-6">
                    <p className="font-semibold">Total</p>
                    <p>{formatPrice(Number(totalAmount))}đ</p>
                  </div>
                  <div className="button_checkout ">
                    <Button
                      onClick={() => handleCheckout()}
                      className=" bg-[#444444] rounded-[15px] w-full"
                    >
                      CHECKOUT
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              !mobile && (
                <div className="content w-[35%] p-[30px] xl:mt-48 bg-[#FFFFFF] rounded-[15px] shadow-[0_5px_10px_0_rgb(0,0,0,0.2)]">
                  <div className="title">
                    <p className="text-xl font-bold text-[#000]">
                      Cart Summary
                    </p>
                  </div>
                  <div className="separate h-[1px] my-[15px] bg-[#D5D5D5]" />
                  <div className="product_order my-[15px] h-[500px] overflow-auto">
                    {cartList.length > 0 &&
                      cartList.map((item: CartItem) => {
                        return (
                          <div
                            key={item.id_product}
                            className="item_cart flex justify-between border-b-[1px] border-b-[#D5D5D5] py-[15px]"
                          >
                            <div className="item_left w-1/2">
                              <div className="image_item w-[120px] h-[120px] relative">
                                <img
                                  src={item.thumbnail}
                                  alt={item.name}
                                  className="absolute top-1/2 -translate-x-1/2 -right-1/2 -translate-y-1/2"
                                />
                              </div>
                            </div>
                            <div className="item_mid flex flex-col justify-center w-1/2">
                              <div className="info_item flex flex-col gap-[8px]">
                                <div className="name_item text-base font-semibold overflow-hidden max-w-[120px] truncate">
                                  {item.name}
                                </div>
                                <div className="info_detail items-center flex text-sm tracking-widest text-[#5D5D5D] gap-[20px]">
                                  <p>{item.storage}</p>
                                  <p
                                    style={{
                                      backgroundColor: `${item.color}`,
                                    }}
                                    className={`max-w-[20px] max-h-[20px] w-[20px] h-[20px] rounded-full`}
                                  ></p>
                                </div>
                                <div className="price_item text-xs font-semibold tracking-widest">
                                  {formatPrice(
                                    Number(item.price * item.quantity)
                                  )}
                                  đ
                                </div>
                                <div className="number w-full">
                                  <p>Quantity: {item.quantity}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="discount">
                    <div className="total_discount">
                      <div className="text-sm text-[#444444] flex justify-between pb-1">
                        <p>{cartList.length} Item</p>
                        <p>{formatPrice(Number(totalAmount))}</p>
                      </div>
                      <div className="text-sm text-[#444444] flex justify-between">
                        <p>Delivery</p>
                        <p>{formatPrice(Number(0))}</p>
                      </div>
                      <div className="text-sm text-[#444444] flex justify-between">
                        <p>Discount</p>
                        <p>-0%</p>
                      </div>
                    </div>
                  </div>
                  <div className="separate h-[1px] my-[15px] bg-[#D5D5D5]" />
                  <div className="total flex justify-between pb-6">
                    <p className="font-semibold">Total</p>
                    <p>{formatPrice(Number(totalAmount))}đ</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-[800px] pt-[70px] bg-white">
          <div className="flex items-center justify-center flex-col">
            <img src={EmptyCart.src} alt="Empty Cart" />
            <Button onClick={() => router.push("/product")} className="ml-2">
              Go back to menu
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
