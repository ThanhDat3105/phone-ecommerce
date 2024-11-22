import { formatPrice } from "@/src/utils/price";
import "./itemProduct.scss";
import { PhoneResType } from "@/src/interface/product";
import Link from "next/link";
import Image from "next/image";
interface Props {
  ele: PhoneResType;
  value?: string;
}

export default async function ItemProduct(props: Props) {
  return (
    <Link
      prefetch={true}
      href={`/product/${props.ele.id_product}`}
      style={{ scrollSnapAlign: "start", textDecoration: "none" }}
    >
      <div
        className={`item cursor-pointer text-black bg-[#FFFFFF] rounded-[20px] xl:shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] xl:hover:shadow-[0_5px_10px_0_rgba(0,0,0,0.3)] shadow-[0_5px_10px_0_rgba(0,0,0,0.09)] transition-all duration-300 xl:px-7 px-3 xl:pb-[30px] pb-5 xl:mb-0 xl:max-w-none max-w-[265px] mb-7 mx-auto xl:hover:scale-[1.03]`}
      >
        <div className="relative mx-auto xl:w-[210px] w-[170px] xl:h-[275px] h-[200px]">
          <Image
            fill
            src={props.ele?.thumbnail}
            alt="img-phone"
            objectFit="contain"
          />
        </div>
        <div className="item_bottom">
          <div className="title_item pb-6 text-center flex flex-col items-center">
            <h1 className="xl:text-base text-sm truncate w-[150px]">
              {props.ele?.name}
            </h1>
            <div className="xl:text-base text-sm flex justify-center gap-1 items-center">
              <h1>{props.ele?.storage[0].name}</h1>
            </div>
          </div>
          <div className="price relative py-[5px] border-[1px] border-solid border-[#D5D5D5] rounded-[30px]">
            <div className="price_all overflow-hidden flex justify-center xl:gap-[10px] gap-[5px] items-center">
              <div className="price_sale xl:text-base text-xs">
                {formatPrice(props.ele?.price)}đ
              </div>
              <div className="original_price text-xs flex items-end text-[#B9B9B9]">
                <del>{formatPrice(props.ele?.original_price)}đ</del>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
