"use client";
import React, { useRef, useState } from "react";

import { FaHeart } from "react-icons/fa";
import { Button } from "@/src/components/ui/button";

import Collapse from "@/src/components/collapse";
import { IoIosArrowDown } from "react-icons/io";

import "./QNA.scss";
import { StarFill } from "@/src/components/icons/icon/StarFill";
import { StarEmpty } from "@/src/components/icons/icon/StarEmpty";

export default function QNA() {
  const elRef = useRef<HTMLDivElement>(null);
  const [reverse, setReverse] = useState<boolean>(false);

  const [hide, setHide] = useState<boolean>(false);

  const checkHeight = (value: React.RefObject<HTMLDivElement> | null) => {
    if (value?.current) {
      const clientHeight = Number(value.current.clientHeight);
      if (clientHeight === 400) {
        value.current.style.height = value.current.scrollHeight + "px";
        setReverse(true);
      } else {
        value.current.style.height = `400px`;
        setReverse(false);
      }
    }
  };
  return (
    <div className="q_and_a pb-20">
      <div className="container_all">
        <div className="top">
          <div className="option flex justify-center gap-[100px]">
            <div className="relative" onClick={() => setHide(true)}>
              <p className="text-3xl cursor-pointer">Review</p>
              <div
                className={`separate transition-all duration-300 w-full bottom-[-20px] absolute h-[2px] ${
                  hide ? "scale-[1.1] bg-[#444444]" : "scale-[0.1] bg-[white]"
                }`}
              />
            </div>
            <div className="relative" onClick={() => setHide(false)}>
              <p className="text-3xl cursor-pointer">Question</p>
              <div
                className={`separate transition-all duration-300 w-full bottom-[-20px] absolute h-[2px] ${
                  !hide ? "scale-[1.1] bg-[#444444]" : "scale-[0.1] bg-[white]"
                }`}
              />
            </div>
          </div>
          <div className="separate h-[1px] bg-[#D5D5D5] mb-16 mt-5" />
        </div>
        <div className="bottom">
          {hide ? (
            <div className="review flex gap-[50px]">
              <div className="left w-[35%]">
                <div className="evaluate flex items-center gap-[20px]">
                  <div className="text-center text-[#444444]">
                    <p className="text-[50px] font-semibold">4.3</p>
                    <div className="star flex gap-[5px] py-4">
                      <StarFill />
                      <StarFill />
                      <StarFill />
                      <StarFill />
                      <StarEmpty />
                    </div>
                    <p>4 Ratings</p>
                  </div>
                  <div className="separate w-[1px] bg-[#D5D5D5] h-[100px]" />
                  <div className="flex flex-col justify-between gap-[10px]">
                    <div className="item max-w-[185px] w-[185px] flex gap-[10px] items-center">
                      <p className="text-xl w-[45%] tracking-wider">5 stars</p>
                      <div className="timeline_star bg-[#D9D9D9] rounded-[20px] h-[6px] relative w-[105px]">
                        <p className="bg-[#5D5D5D] w-[42%] absolute rounded-[20px] h-[6px] top-0 left-0"></p>
                      </div>
                    </div>
                    <div className="item max-w-[185px] w-[185px] flex gap-[10px] items-center">
                      <p className="text-xl w-[45%] tracking-wider">4 stars</p>
                      <div className="timeline_star bg-[#D9D9D9] rounded-[20px] h-[6px] relative w-[105px]">
                        <p className="bg-[#5D5D5D] w-[42%] absolute rounded-[20px] h-[6px] top-0 left-0"></p>
                      </div>
                    </div>
                    <div className="item max-w-[185px] w-[185px] flex gap-[10px] items-center">
                      <p className="text-xl w-[45%] tracking-wider">3 stars</p>
                      <div className="timeline_star bg-[#D9D9D9] rounded-[20px] h-[6px] relative w-[105px]">
                        <p className="bg-[#5D5D5D] w-[42%] absolute rounded-[20px] h-[6px] top-0 left-0"></p>
                      </div>
                    </div>
                    <div className="item max-w-[185px] w-[185px] flex gap-[10px] items-center">
                      <p className="text-xl w-[45%] tracking-wider">2 stars</p>
                      <div className="timeline_star bg-[#D9D9D9] rounded-[20px] h-[6px] relative w-[105px]">
                        <p className="bg-[#5D5D5D] w-[42%] absolute rounded-[20px] h-[6px] top-0 left-0"></p>
                      </div>
                    </div>
                    <div className="item max-w-[185px] w-[185px] flex gap-[10px] items-center">
                      <p className="text-xl w-[45%] tracking-wider">1 star</p>
                      <div className="timeline_star bg-[#D9D9D9] rounded-[20px] h-[6px] relative w-[105px]">
                        <p className="bg-[#5D5D5D] w-[42%] absolute rounded-[20px] h-[6px] top-0 left-0"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button_write text-center pt-[90px]">
                  <Button className="rounded-[20px] px-5 bg-[#444444] text-xl tracking-wider">
                    Write a review
                  </Button>
                </div>
              </div>
              <div className="separate w-[1px] bg-black" />
              <div className="right relative w-[65%] flex flex-col gap-[50px]">
                <div
                  ref={elRef}
                  className="item_all transition-all duration-1000 h-[400px] overflow-hidden"
                >
                  <div className="item">
                    <div className="info flex items-center gap-[20px] mb-[30px]">
                      <div className="avatar rounded-full border-[1px] bg-[#D9D9D9] p-2">
                        LA
                      </div>
                      <div className="name">
                        <p>LÊ VĂN A</p>
                      </div>
                      <div className="star flex gap-[5px] mb-[5px]">
                        <StarFill />
                        <StarFill />
                        <StarFill />
                        <StarFill />
                        <StarEmpty />
                      </div>
                    </div>
                    <div className="content flex items-center justify-between relative">
                      <Collapse>
                        <div className="relative content_all">
                          <div className="text flex flex-col gap-[5px]">
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              1/ Hàng box đẹp
                            </p>
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              2/ Giao hàng nhanh
                            </p>
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              3/ Web khá ổn. Xem trên Máy tính thì hơi chậm
                            </p>
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              4/ Nhân viên tư vấn nhiệt tình , sạc nhanh dùng ít
                              nên hơn một ngày mới sạc lại
                            </p>
                          </div>
                        </div>
                      </Collapse>
                      <div className="heart flex flex-col items-center gap-[5px]">
                        <FaHeart />
                        <p>4</p>
                      </div>
                    </div>
                    <div className="date pt-10">
                      <p>18/7/2023</p>
                    </div>
                    <div className="separate h-[1px] bg-black my-[50px] w-[90%]" />
                  </div>
                  <div className="item">
                    <div className="info flex items-center gap-[20px] mb-[30px]">
                      <div className="avatar rounded-full border-[1px] bg-[#D9D9D9] p-2">
                        LA
                      </div>
                      <div className="name">
                        <p>LÊ VĂN A</p>
                      </div>
                      <div className="star flex gap-[5px] mb-[5px]">
                        <StarFill />
                        <StarFill />
                        <StarFill />
                        <StarFill />
                        <StarEmpty />
                      </div>
                    </div>
                    <div className="content flex items-center justify-between relative">
                      <Collapse>
                        <div className="relative content_all">
                          <div className="text flex flex-col gap-[5px]">
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              1/ Hàng box đẹp
                            </p>
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              2/ Giao hàng nhanh
                            </p>
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              3/ Web khá ổn. Xem trên Máy tính thì hơi chậm
                            </p>
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              4/ Nhân viên tư vấn nhiệt tình , sạc nhanh dùng ít
                              nên hơn một ngày mới sạc lại
                            </p>
                          </div>
                        </div>
                      </Collapse>
                      <div className="heart flex flex-col items-center gap-[5px]">
                        <FaHeart />
                        <p>4</p>
                      </div>
                    </div>
                    <div className="date pt-10">
                      <p>18/7/2023</p>
                    </div>
                    <div className="separate h-[1px] bg-black my-[50px] w-[90%]" />
                  </div>
                  <div className="item">
                    <div className="info flex items-center gap-[20px] mb-[30px]">
                      <div className="avatar rounded-full border-[1px] bg-[#D9D9D9] p-2">
                        LA
                      </div>
                      <div className="name">
                        <p>LÊ VĂN A</p>
                      </div>
                      <div className="star flex gap-[5px] mb-[5px]">
                        <StarFill />
                        <StarFill />
                        <StarFill />
                        <StarFill />
                        <StarEmpty />
                      </div>
                    </div>
                    <div className="content flex items-center justify-between relative">
                      <Collapse>
                        <div className="relative content_all">
                          <div className="text flex flex-col gap-[5px]">
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              1/ Hàng box đẹp
                            </p>
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              2/ Giao hàng nhanh
                            </p>
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              3/ Web khá ổn. Xem trên Máy tính thì hơi chậm
                            </p>
                            <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                              4/ Nhân viên tư vấn nhiệt tình , sạc nhanh dùng ít
                              nên hơn một ngày mới sạc lại
                            </p>
                          </div>
                        </div>
                      </Collapse>
                      <div className="heart flex flex-col items-center gap-[5px]">
                        <FaHeart />
                        <p>4</p>
                      </div>
                    </div>
                    <div className="date pt-10">
                      <p>18/7/2023</p>
                    </div>
                    <div className="separate h-[1px] bg-black my-[50px] w-[90%]" />
                  </div>
                </div>
                {!reverse ? <div className="linear_gradient" /> : ""}
                {!reverse ? (
                  <p
                    onClick={() => checkHeight(elRef)}
                    className="absolute flex items-center gap-2 right-[50%] bottom-[-10%] text-xl cursor-pointer"
                  >
                    <IoIosArrowDown /> See More
                  </p>
                ) : (
                  <p
                    onClick={() => checkHeight(elRef)}
                    className="absolute flex items-center gap-2 right-[50%] bottom-[-20px] text-xl cursor-pointer"
                  >
                    <IoIosArrowDown className="rotate-180" /> Hide Less
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="question">
              <div className="question flex gap-[50px]">
                <div className="left w-[35%]">
                  <div className="left_all flex flex-col gap-5">
                    <p className="text-4xl font-bold tracking-wider pb-5">
                      Comment
                    </p>
                    <div className="evaluate flex items-center gap-[20px]">
                      <input
                        type="text"
                        placeholder="Write Comment"
                        className="text-base font-bold text-black tracking-wider py-5 w-full pl-5 border-[#444444] border-[1px] rounded-[10px] focus-visible:outline-none"
                      />
                    </div>
                    <div className="button_write text-center relative">
                      <Button className="rounded-[10px] absolute right-0 px-8 py-6 bg-[#444444] text-xl tracking-wider">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="separate w-[1px] bg-black" />
                <div className="right relative w-[65%] flex flex-col gap-[50px]">
                  <div
                    ref={elRef}
                    className="item_all transition-all duration-1000 h-[400px] overflow-hidden"
                  >
                    <div className="item">
                      <div className="info flex items-center gap-[20px] mb-[30px]">
                        <div className="avatar rounded-full border-[1px] bg-[#D9D9D9] p-2">
                          LA
                        </div>
                        <div className="name">
                          <p>LÊ VĂN A</p>
                        </div>
                        <div className="star flex gap-[5px] mb-[5px]">
                          <StarFill />
                          <StarFill />
                          <StarFill />
                          <StarFill />
                          <StarEmpty />
                        </div>
                      </div>
                      <div className="content flex items-center justify-between relative">
                        <Collapse>
                          <div className="relative content_all">
                            <div className="text flex flex-col gap-[5px]">
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                1/ Hàng box đẹp
                              </p>
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                2/ Giao hàng nhanh
                              </p>
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                3/ Web khá ổn. Xem trên Máy tính thì hơi chậm
                              </p>
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                4/ Nhân viên tư vấn nhiệt tình , sạc nhanh dùng
                                ít nên hơn một ngày mới sạc lại
                              </p>
                            </div>
                          </div>
                        </Collapse>
                        <div className="heart flex flex-col items-center gap-[5px]">
                          <FaHeart />
                          <p>4</p>
                        </div>
                      </div>
                      <div className="date pt-10">
                        <p>18/7/2023</p>
                      </div>
                      <div className="separate h-[1px] bg-black my-[50px] w-[90%]" />
                    </div>
                    <div className="item">
                      <div className="info flex items-center gap-[20px] mb-[30px]">
                        <div className="avatar rounded-full border-[1px] bg-[#D9D9D9] p-2">
                          LA
                        </div>
                        <div className="name">
                          <p>LÊ VĂN A</p>
                        </div>
                        <div className="star flex gap-[5px] mb-[5px]">
                          <StarFill />
                          <StarFill />
                          <StarFill />
                          <StarFill />
                          <StarEmpty />
                        </div>
                      </div>
                      <div className="content flex items-center justify-between relative">
                        <Collapse>
                          <div className="relative content_all">
                            <div className="text flex flex-col gap-[5px]">
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                1/ Hàng box đẹp
                              </p>
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                2/ Giao hàng nhanh
                              </p>
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                3/ Web khá ổn. Xem trên Máy tính thì hơi chậm
                              </p>
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                4/ Nhân viên tư vấn nhiệt tình , sạc nhanh dùng
                                ít nên hơn một ngày mới sạc lại
                              </p>
                            </div>
                          </div>
                        </Collapse>
                        <div className="heart flex flex-col items-center gap-[5px]">
                          <FaHeart />
                          <p>4</p>
                        </div>
                      </div>
                      <div className="date pt-10">
                        <p>18/7/2023</p>
                      </div>
                      <div className="separate h-[1px] bg-black my-[50px] w-[90%]" />
                    </div>
                    <div className="item">
                      <div className="info flex items-center gap-[20px] mb-[30px]">
                        <div className="avatar rounded-full border-[1px] bg-[#D9D9D9] p-2">
                          LA
                        </div>
                        <div className="name">
                          <p>LÊ VĂN A</p>
                        </div>
                        <div className="star flex gap-[5px] mb-[5px]">
                          <StarFill />
                          <StarFill />
                          <StarFill />
                          <StarFill />
                          <StarEmpty />
                        </div>
                      </div>
                      <div className="content flex items-center justify-between relative">
                        <Collapse>
                          <div className="relative content_all">
                            <div className="text flex flex-col gap-[5px]">
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                1/ Hàng box đẹp
                              </p>
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                2/ Giao hàng nhanh
                              </p>
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                3/ Web khá ổn. Xem trên Máy tính thì hơi chậm
                              </p>
                              <p className="line-clamp-1 w-300px max-w-[300px] text-ellipsis overflow-hidden whitespace-break-spaces">
                                4/ Nhân viên tư vấn nhiệt tình , sạc nhanh dùng
                                ít nên hơn một ngày mới sạc lại
                              </p>
                            </div>
                          </div>
                        </Collapse>
                        <div className="heart flex flex-col items-center gap-[5px]">
                          <FaHeart />
                          <p>4</p>
                        </div>
                      </div>
                      <div className="date pt-10">
                        <p>18/7/2023</p>
                      </div>
                      <div className="separate h-[1px] bg-black my-[50px] w-[90%]" />
                    </div>
                  </div>
                  {!reverse ? <div className="linear_gradient" /> : ""}
                  {!reverse ? (
                    <p
                      onClick={() => checkHeight(elRef)}
                      className="absolute flex items-center gap-2 right-[50%] bottom-[-10%] text-xl cursor-pointer"
                    >
                      <IoIosArrowDown /> See More
                    </p>
                  ) : (
                    <p
                      onClick={() => checkHeight(elRef)}
                      className="absolute flex items-center gap-2 right-[50%] bottom-[-20px] text-xl cursor-pointer"
                    >
                      <IoIosArrowDown className="rotate-180" /> Hide Less
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
