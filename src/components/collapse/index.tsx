"use client";
import React, { useRef, ReactNode, useState } from "react";
interface Props {
  children: ReactNode;
}

import "./collapse.scss";

export default function Collapse(props: Props) {
  const elRef = useRef<HTMLDivElement>(null);
  const [reverse, setReverse] = useState<boolean>(false);

  const checkHeight = (value: React.RefObject<HTMLDivElement> | null) => {
    if (value?.current) {
      const clientHeight = Number(value.current.clientHeight);
      if (clientHeight === 70) {
        value.current.style.height = value.current.scrollHeight + "px";
        setReverse(true);
      } else {
        value.current.style.height = `70px`;
        setReverse(false);
      }
    }
  };

  return (
    <div className="collapse_all relative flex flex-col gap-5">
      <div ref={elRef} className="collapse_check relative">
        {props.children}
      </div>
      <p
        onClick={() => checkHeight(elRef)}
        className="absolute opacity-30 left-[15%] text-sm cursor-pointer bottom-[-30%]"
      >
        {!reverse ? "See More" : "Hide Less"}
      </p>
      {!reverse ? <div className="linear_gradient" /> : ""}
    </div>
  );
}
