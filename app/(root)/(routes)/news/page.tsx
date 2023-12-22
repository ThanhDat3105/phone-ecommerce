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

export default function NewPage() {
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
      <div className="new_page py-[120px] bg-white">
        <div className="container_all">
          <div className="new">
            <div className="title">
              <p className="text-3xl font-semibold text-center">NEWS</p>
            </div>
            <div className="content flex justify-between gap-[30px] mt-[30px]">
              <div className="left relative cursor-pointer">
                <img src={new1.src} alt="new" />
                <p className="absolute text-2xl font-semibold text-center w-[490px] px-[35px] bottom-[5%] rounded-[20px] py-5 right-[50%] translate-x-[50%] bg-white">
                  Tiêu điểm cuối năm 2023: Tổng hợp sản phẩm MacBook và iMac mới
                  nhất của Apple
                </p>
              </div>
              <div className="right flex flex-col gap-[30px]">
                <div className="top justify-center relative flex cursor-pointer">
                  <img src={new2.src} alt="new" className="rounded-[20px]" />
                  <div className="liner_gradient" />
                  <p className="absolute text-xl font-semibold text-center text-white bottom-0 w-[330px]">
                    Thông số MacBook Air M2 15 inch 2023 có gì mới? Có đáng để
                    “xuống tiền?
                  </p>
                </div>
                <div className="bottom justify-center relative flex cursor-pointer">
                  <img src={new3.src} alt="new" className="rounded-[20px]" />
                  <div className="liner_gradient" />
                  <p className="absolute text-xl font-semibold text-center text-white bottom-0 w-[330px]">
                    iPad đang dần thay thế Macbook như thế nào?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-[60px]">
            {arr.map((ele) => {
              return (
                <Button className="text-black w-[120px] text-center py-2 bg-[#E5E7EB] rounded-[10px] hover:text-white">
                  {ele.name}
                </Button>
              );
            })}
          </div>
          <div className="new_apple">
            <div className="title my-[60px] text-3xl font-semibold">
              <p>News Apple</p>
            </div>
            <div className="item_all grid grid-cols-2 gap-[30px]">
              {news
                .filter((ele) => ele.type === "apple")
                .map((filter) => {
                  return <ItemNew data={filter} />;
                })}
            </div>
            <div className="bottom flex justify-center items-center gap-[10px] mt-[30px]">
              <p className="text-xl">See More About Apple</p>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="review">
            <div className="title my-[60px] text-3xl font-semibold">
              <p>Review</p>
            </div>
            <div className="item_all grid grid-cols-2 gap-[30px]">
              {news
                .filter((ele) => ele.type === "review")
                .map((filter) => {
                  return <ItemNew data={filter} />;
                })}
            </div>
            <div className="bottom flex justify-center items-center gap-[10px] mt-[30px]">
              <p className="text-xl">See More About Apple</p>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="discover">
            <div className="title my-[60px] text-3xl font-semibold">
              <p>Discover</p>
            </div>
            <div className="item_all grid grid-cols-2 gap-[30px]">
              {news
                .filter((ele) => ele.type === "discover")
                .map((filter) => {
                  return <ItemNew data={filter} />;
                })}
            </div>
            <div className="bottom flex justify-center items-center gap-[10px] mt-[30px]">
              <p className="text-xl">See More About Apple</p>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="other_new">
            <div className="title my-[60px] text-3xl font-semibold">
              <p>other</p>
            </div>
            <div className="item_all grid grid-cols-2 gap-[30px]">
              {news
                .filter((ele) => ele.type === "other")
                .map((filter) => {
                  return <ItemNew data={filter} />;
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
