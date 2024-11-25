import { IoIosArrowForward } from "react-icons/io";
import { PhoneResType } from "@/src/interface/product";
import Link from "next/link";

interface Props {
  phone: PhoneResType;
}

export default function MenuBack({ phone }: Props) {
  return (
    <div className="menu_back flex xl:text-base text-sm text-[#5D5D5D] tracking-wider gap-6">
      <Link
        style={{ textDecoration: "none" }}
        href="/"
        className="cursor-pointer text-black"
      >
        Home
      </Link>
      <IoIosArrowForward className="cursor-pointer" />
      <Link
        style={{ textDecoration: "none" }}
        href={`/product?brand=${phone?.categoryBrandMapping?.brand?.name}`}
        className="text-black"
      >
        {phone?.categoryBrandMapping?.brand?.name}
      </Link>
      <IoIosArrowForward className="cursor-pointer" />
      <p className="text-black cursor-pointer">{phone?.name}</p>
    </div>
  );
}
