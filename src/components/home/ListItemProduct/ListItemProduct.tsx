import ItemProduct from "../../item_product/ItemProduct";
import { Button } from "@/src/components/ui/button";

import { IoIosArrowForward } from "react-icons/io";
import { PhoneResType } from "@/src/interface/product";
import Link from "next/link";

interface Props {
  title: string;
  ele: PhoneResType[];
  brand: string;
}

export default function ListItemProduct({ brand, ele, title }: Props) {
  return (
    <div>
      <div className="list_item">
        <div className="title flex justify-between items-center">
          <p className="xl:text-[32px] md:text-2xl text-xl font-bold">
            {title}
          </p>
          <Link href={`/product?brand=${brand}`}>
            <Button className="text-xl gap-2 bg-transparent text-black hover:bg-transparent p-0">
              See more <IoIosArrowForward />
            </Button>
          </Link>
        </div>
        <div
          className="product_thumbnail xl:pt-11 pt-5 md:justify-between gap-5 flex xl:overflow-visible overflow-auto"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {ele?.length > 0 &&
            ele?.map((ele: PhoneResType) => {
              return <ItemProduct key={ele.id_product} ele={ele} />;
            })}
        </div>
      </div>
    </div>
  );
}
