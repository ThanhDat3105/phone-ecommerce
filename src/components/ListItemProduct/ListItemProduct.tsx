"use client";
import React from "react";
import ItemProduct from "../item_product/ItemProduct";
import { Button } from "@/src/components/ui/button";

import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { PhoneResType } from "@/src/interface/product";

interface Props {
  title: string;
  ele: PhoneResType[];
  brand: string;
}

export default function ListItemProduct(props: Props) {
  const router = useRouter();

  const skeletonItem = () => {
    return (
      <div className="relative">
        <div
          className={`skeleton h-[407px] w-[266px] item cursor-pointer bg-[#FFFFFF] rounded-[20px] xl:shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] xl:px-7 px-3 xl:pb-[30px] pb-5 relative transition-all duration-300 xl:mb-0 xl:max-w-none md:max-w-[300px] ml-auto mr-auto md:mb-7 xl:hover:scale-[1.03] xl:hover:shadow-[0_5px_10px_0_rgba(0,0,0,0.3)] shadow-[0_5px_10px_0_rgba(0,0,0,0.05)]`}
        ></div>
      </div>
    );
  };

  return (
    <div>
      <div className="list_item">
        <div className="title flex justify-center items-center">
          <p className="xl:text-[32px] md:text-2xl text-xl">{props.title}</p>
        </div>
        <div
          className="product_thumbnail xl:pt-11 pt-5 xl:gap-[45px] gap-5 flex xl:overflow-visible overflow-auto"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {props.ele?.length > 0 ? (
            props.ele?.map((ele: PhoneResType) => {
              return <ItemProduct key={ele.id_product} ele={ele} />;
            })
          ) : (
            <>
              {skeletonItem()}
              {skeletonItem()}
              {skeletonItem()}
              {skeletonItem()}
            </>
          )}
        </div>
      </div>
      <div className="button_more flex justify-center xl:pt-11 pt-5 items-center">
        <Button
          onClick={() => router.push(`/product?brand=${props.brand}`)}
          className="rounded-[15px] py-3 px-5 text-xl gap-2 bg-transparent text-black border-[1px] border-solid border-[black] hover:bg-transparent"
        >
          See more <IoIosArrowForward />
        </Button>
      </div>
    </div>
  );
}
