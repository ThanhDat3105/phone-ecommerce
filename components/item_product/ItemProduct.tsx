"use client";

import { formatPrice } from "@/utils/price";

import "./itemProduct.scss";
import { useRouter } from "next/navigation";
import { Product } from "@/interface/product";
import { useEffect, useRef, useState } from "react";

interface Props {
  ele: Product;
  value?: string;
}

export default function ItemProduct(props: Props) {
  const router = useRouter();

  const imgRef = useRef<HTMLImageElement>(null);
  const [blur, setBlur] = useState<boolean>(true);

  useEffect(() => {
    if (imgRef) {
      checkIntersectionObserver();
    }
    return;
  }, []);

  const load = (img: any) => {
    const url = img.getAttribute("lazy-src");

    if (url) {
      img.setAttribute("src", url);
      setBlur(false);

      setTimeout(() => {
        img.removeAttribute("lazy-src");
      }, 500);
    }
  };

  const checkIntersectionObserver = () => {
    if (imgRef && imgRef.current) {
      let lazyImages = imgRef?.current;

      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            load(entry.target);
          }
        });
      });

      observer.observe(lazyImages);
    }
  };

  return (
    <div
      className={`item cursor-pointer bg-[#FFFFFF] rounded-[20px] xl:shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] xl:px-7 px-3 xl:pb-[30px] pb-5 relative transition-all duration-300 xl:mb-0 xl:max-w-none md:max-w-[300px] ml-auto mr-auto md:mb-7 xl:hover:scale-[1.03] xl:hover:shadow-[0_5px_10px_0_rgba(0,0,0,0.3)] shadow-[0_5px_10px_0_rgba(0,0,0,0.05)]`}
      style={{ scrollSnapAlign: "start" }}
      onClick={() => router.push(`/product/${props.ele.id_product}`)}
    >
      <div
        className={`item_top transition-all duration-300 pb-6 md:flex md:justify-center xl:w-[210px] w-[170px] xl:h-[275px] h-[200px] relative ${
          blur ? "blur-lg" : "blur-0"
        }`}
      >
        <div className="image">
          <img
            ref={imgRef}
            lazy-src={props.ele.thumbnail}
            src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200/lsci/db/PICTURES/CMS/3200/3253.jpg"
            alt="iphone"
            className="absolute top-[50%] h-[200px] translate-y-[-50%] right-[50%] translate-x-[50%] !object-contain"
          />
        </div>
      </div>
      <div className="item_bottom">
        <div className="title_item pb-6 text-center flex flex-col items-center">
          <h1 className="xl:text-base text-sm truncate w-[150px]">
            {props.ele.name}
          </h1>
          <div className="xl:text-base text-sm flex justify-center gap-1 items-center">
            <h1>{props.ele.storage[0].name}</h1>
          </div>
        </div>
        <div className="price relative py-[5px] border-[1px] border-solid border-[#D5D5D5] rounded-[30px]">
          <div className="price_all overflow-hidden flex justify-center xl:gap-[10px] gap-[5px] items-center">
            <div className="price_sale xl:text-base text-xs">
              {formatPrice(props.ele.price)}đ
            </div>
            <div className="original_price text-xs flex items-end text-[#B9B9B9]">
              <del>{formatPrice(props.ele.original_price)}đ</del>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
