"use client";
import React, { useRef, ReactNode, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

interface Props {
  title: string;
  children: ReactNode;
}

import "./collapse.scss";

export default function Collapse(props: Props) {
  const elRef = useRef<HTMLDivElement>(null);
  const [reverse, setReverse] = useState<boolean>(false);

  const checkHeight = (value: React.RefObject<HTMLDivElement> | null) => {
    if (value?.current) {
      const clientHeight = Number(value.current.clientHeight);
      if (clientHeight > 0) {
        value.current.style.height = "0px";
        setReverse(false);
      } else {
        value.current.style.height = value.current.scrollHeight + "px";
        setReverse(true);
      }
    }
  };

  return (
    <div className="collapse_all flex flex-col gap-5">
      <div
        className="collapse_title flex justify-between items-center font-bold cursor-pointer"
        onClick={() => checkHeight(elRef)}
      >
        <h5 className="text-lg">{props.title}</h5>
        {!reverse ? <AiOutlineDown /> : <AiOutlineUp />}
      </div>
      <div
        ref={elRef}
        className="collapse_check pl-5 flex flex-col gap-[10px] transition-all duration-500 overflow-hidden h-0 cursor-pointer tracking-widest"
      >
        {props.children}
      </div>
    </div>
  );
}
