"use client";
import Collapse from "@/app/components/collapse";
import { FaTrash } from "react-icons/fa";

import { Slider } from "antd";

import "./filterLeft.scss";

export default function FilterLeft() {
  const onChange = (value: number | number[]) => {
    console.log("onChange: ", value);
  };

  const onChangeComplete = (value: number | number[]) => {
    console.log("onChangeComplete: ", value);
  };

  const handleClick: React.MouseEventHandler<HTMLParagraphElement> = (
    value
  ) => {
    document.querySelector(".active")?.classList.remove("active");
    value.currentTarget.classList.add("active");
  };

  return (
    <div className="filter_left w-[30%] bg-white shadow-[0_5px_10px_0_rgba(0,0,0,0.3)] rounded-[20px] pb-12">
      <div className="content">
        <div className="filter_title flex justify-between items-center py-5 px-10">
          <div className="title">
            <p className="text-2xl">Filters</p>
          </div>
          <div className="clear">
            <FaTrash className="text-2xl text-[#AAAAAA]" />
          </div>
        </div>
        <div className="separate_title h-[2px] w-full bg-black" />
        <div className="filter_collapse pt-10 px-10">
          <div className="company">
            <Collapse title="Smartphones">
              <div className="item">
                <p onClick={handleClick}>Apple</p>
                <div className="border_b" />
              </div>
              <div className="item">
                <p onClick={handleClick}>Samsung</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>Google</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>Oppo</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>Vivo</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>Realme</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>Xiaomi</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>Nokia</p>
              </div>
            </Collapse>
          </div>
          <div className="separate" />
          <div className="demand">
            <Collapse title="Demand">
              <div className="item">
                <p onClick={handleClick}>Gaming</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>Battery pfe</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>Performance</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>Design</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>Camera</p>
              </div>
            </Collapse>
          </div>
          <div className="separate" />
          <div className="soft_ware">
            <Collapse title="Software">
              <div className="item">
                <p onClick={handleClick}>IOS</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>Android</p>
              </div>
            </Collapse>
          </div>
          <div className="separate" />
          <div className="storage">
            <Collapse title="Storage">
              <div className="item">
                <p onClick={handleClick}>64GB</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>128GB</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>256GB</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>512GB</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>1TB</p>
              </div>
            </Collapse>
          </div>
          <div className="separate" />
          <div className="ram">
            <Collapse title="Ram">
              <div className="item">
                <p onClick={handleClick}>4GB - 8GB</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>8GB - 12GB</p>
              </div>
              <div className="item">
                <p onClick={handleClick}>12GB -</p>
              </div>
            </Collapse>
          </div>
          <div className="separate" />
          <div className="price">
            <Collapse title="Prices">
              <Slider
                range
                step={10}
                defaultValue={[20, 50]}
                onChange={onChange}
                onChangeComplete={onChangeComplete}
              />
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}
