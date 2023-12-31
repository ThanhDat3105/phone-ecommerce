"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import banner2 from "@/public/image/home/banner/banner.png";
import banner1 from "@/public/image/home/banner/oppo4.png";
import banner3 from "@/public/image/home/banner/banner_samsung.webp";

import "./banner.scss";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

export default function Banner() {
  const banner = [
    {
      id: 1,
      img: banner1,
    },
    {
      id: 2,
      img: banner2,
    },
    {
      id: 3,
      img: banner3,
    },
  ];
  return (
    <div className="banner pt-[70px]">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {banner.map((ele) => {
          return (
            <SwiperSlide key={ele.id}>
              <div className="image h-[180px] xl:h-[500px] md:h-[360px]">
                <img src={ele.img.src} alt="banner" className="w-full h-full" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
