import ItemProduct from "@/components/item_product/ItemProduct";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Product } from "@/interface/product";
import { useEffect, useState } from "react";

interface Props {
  phoneList: Product[];
  info: Product;
}

export default function RelatedProduct(props: Props) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const isRelated = "related";
  // Hàm xáo trộn mảng
  const shuffleArray = (array: Product[]) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const skeletonItem = () => {
    return (
      <div className="relative">
        <div
          className={`skeleton h-[407px] w-[266px] item cursor-pointer bg-[#FFFFFF] rounded-[20px] xl:shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] xl:px-7 px-3 xl:pb-[30px] pb-5 relative transition-all duration-300 xl:mb-0 xl:max-w-none md:max-w-[300px] ml-auto mr-auto md:mb-7 xl:hover:scale-[1.03] xl:hover:shadow-[0_5px_10px_0_rgba(0,0,0,0.3)] shadow-[0_5px_10px_0_rgba(0,0,0,0.05)]`}
        ></div>
      </div>
    );
  };

  const filterRelated = (data: Product[]) => {
    return data.filter((product: Product) => {
      return (
        product.categoryBrandMapping.brand.name ===
          props.info.categoryBrandMapping?.brand.name &&
        product.categoryBrandMapping.category.name ===
          props.info.categoryBrandMapping?.category.name &&
        props.info.id_product !== product.id_product
      );
    });
  };

  useEffect(() => {
    if (props.phoneList?.length > 0) {
      const phoneList = shuffleArray(props.phoneList);
      const result = filterRelated(phoneList);
      if (result.length > 0) setRelatedProducts(result);
    }
  }, [props.phoneList]);

  return (
    relatedProducts.length > 0 && (
      <div className="related_products mb-[30px]">
        <div className="title mb-[50px]">
          <h1 className="text-3xl font-semibold tracking-wider">
            Related Product
          </h1>
        </div>
        <div className="item">
          <Swiper
            pagination={false}
            modules={[Pagination]}
            className="mySwiper !pb-10 !px-[10px]"
            breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 50,
              },

              1336: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
          >
            {relatedProducts.length > 0 ? (
              relatedProducts.map((filteredEle: Product) => (
                <SwiperSlide key={filteredEle.id_product} className="m-0">
                  <ItemProduct ele={filteredEle} value={isRelated} />
                </SwiperSlide>
              ))
            ) : (
              <div className="flex gap-7">
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
              </div>
            )}
          </Swiper>
        </div>
      </div>
    )
  );
}
