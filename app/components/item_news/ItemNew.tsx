"use client";
import React, { useEffect, useRef } from "react";
import { newsItem } from "@/interface/news";
import "./itemNew.scss";
import { useRouter } from "next/navigation";

interface Props {
  data: newsItem;
}

export default function ItemNew(props: Props) {
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);

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
    <div>
      <div
        onClick={() => router.push(`/news/${props.data.id}`)}
        className="item flex gap-[30px] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
      >
        <div className="image w-[50%]">
          <img
            ref={imgRef}
            src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200/lsci/db/PICTURES/CMS/3200/3253.jpg"
            lazy-src={props.data?.img?.src}
            alt={props.data.type}
            className="h-[200px] img-lazy"
          />
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
