"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import banner from "@/public/image/home/banner/banner.png";

import "./banner.scss";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

export default function Banner() {
  return (
    <div className="banner">
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <div className="image">
            <img src={banner.src} alt="banner" className="w-full" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image">
            <img src={banner.src} alt="banner" className="w-full" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image">
            <img src={banner.src} alt="banner" className="w-full" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
