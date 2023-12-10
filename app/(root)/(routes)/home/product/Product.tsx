import { FaApple } from "react-icons/fa";
import ItemProduct from "./item_product/ItemProduct";
import { productItem } from "@/interface/product";
import { Button } from "@/components/ui/button";

import { IoIosArrowForward } from "react-icons/io";

export default function Product() {
  const item = [
    {
      id: 1,
      title: "iPhone 15 Pro max 256GB",
      price: 32990000,
      originalPrice: 37990000,
    },
    {
      id: 2,
      title: "iPhone 15 Pro max 256GB",
      price: 32990000,
      originalPrice: 37990000,
    },
    {
      id: 3,
      title: "iPhone 15 Pro max 256GB",
      price: 32990000,
      originalPrice: 37990000,
    },
    {
      id: 4,
      title: "iPhone 15 Pro max 256GB",
      price: 32990000,
      originalPrice: 37990000,
    },
  ];
  return (
    <div className="product pt-[45px] pb-[20px]">
      <div className="container_all">
        <div className="title flex justify-center items-center gap-[2px]">
          <FaApple className="text-[36px] pb-[5px]" />
          <p className="xl:text-[32px] md:text-2xl">IPHONE</p>
        </div>
        <div className="product_thumbnail grid xl:grid-cols-4 gap-[45px] pt-11 md:grid-cols-2">
          {item.map((ele: productItem) => {
            return <ItemProduct key={ele.id} ele={ele} />;
          })}
        </div>
        <div className="button_more flex justify-center pt-11 items-center">
          <Button className="rounded-[15px] py-3 px-5 text-xl gap-2 bg-transparent text-black border-[1px] border-solid border-[black] hover:bg-transparent">
            See more <IoIosArrowForward className="" />
          </Button>
        </div>
      </div>
    </div>
  );
}
