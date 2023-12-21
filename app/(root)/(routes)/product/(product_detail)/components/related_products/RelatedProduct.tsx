import ItemProduct from "@/app/components/item_product/ItemProduct";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Product } from "@/interface/product";

interface Props {
  ele: Product[];
  brand: string | undefined;
}

export default function RelatedProduct(props: Props) {
  const isRelated = "related";
  return (
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
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },

            1336: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {props.ele
            .filter(
              (ele: Product) =>
                ele.categoryBrandMapping.brand.name === props.brand
            )
            .map((filteredEle: Product) => (
              <SwiperSlide key={filteredEle.id_product} className="m-0">
                <ItemProduct ele={filteredEle} value={isRelated} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
