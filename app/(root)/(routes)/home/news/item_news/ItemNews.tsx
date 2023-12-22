import { newHome } from "@/interface/news";
import { formatDate } from "@/utils/moment";
import React from "react";

interface Props {
  ele: newHome;
}

export default function ItemNews(props: Props) {
  return (
    <div className="item_news rounded-[20px] bg-[#F5F5F5] relative transition-all duration-300 cursor-pointer hover:shadow-[0_5px_10px_0_rgba(0,0,0,0.3)]">
      <div className="item_top rounded-t-[12px] relative overflow-hidden xl:max-h-[170px] h-[170px] md:max-h-[140px]">
        <img className="w-full " src={props.ele.image.src} alt="image_News" />
      </div>
      <div className="item_bottom xl:px-8 pt-5 pb-10 md:px-2 max-[428px]:px-4">
        <div className="title text-sm xl:tracking-wider md:tracking-normal pb-3 overflow-hidden text-ellipsis whitespace-nowrap">
          {props.ele.title}
        </div>
      </div>
      <div className="date text-xs tracking-wide opacity-[50%] absolute bottom-[5%] w-full xl:px-8 md:px-2 max-[428px]:px-4">
        {formatDate(props.ele.date)}
      </div>
    </div>
  );
}
