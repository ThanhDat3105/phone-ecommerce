"use client";
import React from "react";
import MainLayout from "../../MainLayout";

import "./new.scss";

import new1 from "@/public/image/news/new1.png";
import new2 from "@/public/image/news/new2.png";
import new3 from "@/public/image/news/new3.png";
import { Button } from "@/components/ui/button";
import { news } from "@/data/mockData";
import ItemNew from "@/app/components/item_news/ItemNew";

import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function NewPage() {
  const router = useRouter();

  const arr = [
    {
      id: 1,
      name: "Discover",
    },
    {
      id: 2,
      name: "Review",
    },
    {
      id: 3,
      name: "Promotion",
    },
    {
      id: 4,
      name: "Tech News",
    },
    {
      id: 5,
      name: "Tips",
    },
    {
      id: 6,
      name: "Other News",
    },
  ];

  return (
    <MainLayout>
      <div className="new_page xl:py-[120px] py-[90px] bg-white">
        <div className="container_all">
          <div className="new">
            <div className="title">
              <p className="text-3xl font-semibold text-center">NEWS</p>
            </div>
            <div className="content flex max-[1024px]:flex-col justify-between xl:gap-[30px] gap-[70px] mt-[30px]">
              <div
                className="left relative cursor-pointer"
                onClick={() => router.push(`/news/${1}`)}
              >
                <img src={new1.src} alt="new" />
                <p className="absolute xl:text-2xl text-lg font-semibold text-center xl:w-[490px] w-[300px] xl:bottom-[5%] bottom-[-20%] rounded-[20px] xl:py-5 py-3 xl:px-[35px] right-[50%] translate-x-[50%] bg-white">
                  Tiêu điểm cuối năm 2023: Tổng hợp sản phẩm MacBook và iMac mới
                  nhất của Apple
                </p>
              </div>
              <div className="right flex flex-col xl:gap-[30px] gap-[70px]">
                <div
                  className="top justify-center relative flex cursor-pointer"
                  onClick={() => router.push(`/news/${2}`)}
                >
                  <img src={new2.src} alt="new" className="rounded-[20px]" />
                  <div className="liner_gradient" />
                  <p className="absolute text-xl font-semibold text-center text-white bottom-0 w-[330px]">
                    Thông số MacBook Air M2 15 inch 2023 có gì mới? Có đáng để
                    “xuống tiền?
                  </p>
                </div>
                <div
                  className="bottom justify-center relative flex cursor-pointer"
                  onClick={() => router.push(`/news/${3}`)}
                >
                  <img src={new3.src} alt="new" className="rounded-[20px]" />
                  <div className="liner_gradient" />
                  <p className="absolute text-xl font-semibold text-center text-white bottom-0 w-[330px]">
                    iPad đang dần thay thế Macbook như thế nào?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex justify-between mt-[60px] xl:overflow-visible overflow-auto gap-[20px] xl:gap-0"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {arr.map((ele) => {
              return (
                <Button
                  key={ele.id}
                  className="text-black w-[120px] text-center py-2 bg-[#E5E7EB] rounded-[10px] hover:text-white"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {ele.name}
                </Button>
              );
            })}
          </div>
          <div className="new_apple">
            <div className="title xl:my-[60px] my-[30px] text-3xl font-semibold">
              <p>News Apple</p>
            </div>
            <div className="item_all grid xl:grid-cols-2 grid-cols-1 gap-[30px]">
              {news
                .filter((ele) => ele.type === "apple")
                .map((filter) => {
                  return <ItemNew key={filter.id} data={filter} />;
                })}
            </div>
            <div className="bottom flex justify-center items-center gap-[10px] mt-[30px]">
              <p className="text-xl">See More About Apple</p>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="review">
            <div className="title xl:my-[60px] my-[30px] text-3xl font-semibold">
              <p>Review</p>
            </div>
            <div className="item_all grid xl:grid-cols-2 grid-cols-1 gap-[30px]">
              {news
                .filter((ele) => ele.type === "review")
                .map((filter) => {
                  return <ItemNew key={filter.id} data={filter} />;
                })}
            </div>
            <div className="bottom flex justify-center items-center gap-[10px] mt-[30px]">
              <p className="text-xl">See More About Apple</p>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="discover">
            <div className="title xl:my-[60px] my-[30px] text-3xl font-semibold">
              <p>Discover</p>
            </div>
            <div className="item_all grid xl:grid-cols-2 grid-cols-1 gap-[30px]">
              {news
                .filter((ele) => ele.type === "discover")
                .map((filter) => {
                  return <ItemNew key={filter.id} data={filter} />;
                })}
            </div>
            <div className="bottom flex justify-center items-center gap-[10px] mt-[30px]">
              <p className="text-xl">See More About Apple</p>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="other_new">
            <div className="title xl:my-[60px] my-[30px] text-3xl font-semibold">
              <p>Other</p>
            </div>
            <div className="item_all grid xl:grid-cols-2 grid-cols-1 gap-[30px]">
              {news
                .filter((ele) => ele.type === "other")
                .map((filter) => {
                  return <ItemNew key={filter.id} data={filter} />;
                })}
            </div>
            <div className="bottom flex justify-center items-center gap-[10px] mt-[30px]">
              <p className="text-xl">See More About Apple</p>
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
