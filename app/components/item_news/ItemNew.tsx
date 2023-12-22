import React from "react";
import { newsItem } from "@/interface/news";
import "./itemNew.scss";

interface Props {
  data: newsItem;
}

export default function ItemNew(props: Props) {
  return (
    <div>
      <div className="item flex gap-[30px] hover:scale-[1.03] transition-all duration-300 cursor-pointer">
        <div className="image w-[50%]">
          <img src={props.data.img.src} alt={props.data.type} className="" />
        </div>
        <div className="content w-[50%] flex flex-col justify-evenly">
          <div className="des text-xl font-semibold">{props.data.des}</div>
          <div className="date">{props.data.date}</div>
        </div>
      </div>
      <div className="separate h-[1px] bg-[#5D5D5D] mt-[30px]" />
    </div>
  );
}
