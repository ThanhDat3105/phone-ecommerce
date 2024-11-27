"use client";

import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function MenuBack() {
  const router = useRouter();
  return (
    <div className="menu_back mb-[20px] flex text-[#5D5D5D] tracking-wider gap-6 ">
      <p
        onClick={() => router.push("/")}
        className="cursor-pointer transition-all duration-300 hover:text-black"
      >
        Home
      </p>
      <IoIosArrowForward className="cursor-pointer" />
      <p
        onClick={() => router.push("/news")}
        className="cursor-pointer hover:text-black transition-all duration-300"
      >
        News
      </p>
      <IoIosArrowForward className="cursor-pointer" />
      <p className="text-black cursor-pointer">Tin tức Apple</p>
    </div>
  );
}
