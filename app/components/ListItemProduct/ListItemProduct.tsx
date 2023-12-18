import React from "react";
import ItemProduct from "../item_product/ItemProduct";
import { Button } from "@/components/ui/button";

import { IoIosArrowForward } from "react-icons/io";
import { Product } from "@/interface/product";

interface Props {
  title: string;
  ele: Product[];
}

export default function ListItemProduct(props: Props) {
  return (
    <div>
      <div className="list_item">
        <div className="title flex justify-center items-center">
          <p className="xl:text-[32px] md:text-2xl">{props.title}</p>
        </div>
        <div className="product_thumbnail grid xl:grid-cols-4 gap-[45px] pt-11 md:grid-cols-2">
          {props.ele.map((ele: Product) => {
            return <ItemProduct key={ele.id_product} ele={ele} />;
          })}
        </div>
      </div>
      <div className="button_more flex justify-center pt-11 items-center">
        <Button className="rounded-[15px] py-3 px-5 text-xl gap-2 bg-transparent text-black border-[1px] border-solid border-[black] hover:bg-transparent">
          See more <IoIosArrowForward className="" />
        </Button>
      </div>
    </div>
  );
}
