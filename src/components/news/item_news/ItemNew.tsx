import { newsItem } from "@/src/interface/news";
import "./itemNew.scss";
import Link from "next/link";
import Image from "next/image";

interface Props {
  data: newsItem;
}

export default function ItemNew(props: Props) {
  return (
    <Link style={{ textDecoration: "none" }} href={`/news/${props.data.id}`}>
      <div className="item flex gap-[30px] hover:scale-[1.03] transition-all duration-300 cursor-pointer text-black">
        <div
          className={`image w-[50%] transition-all duration-300 h-[200px] relative`}
        >
          <Image src={props.data?.img?.src} alt={props.data.type} fill objectFit="cover"/>
        </div>
        <div className="content w-[50%] flex flex-col justify-evenly">
          <div className="des text-xl font-semibold">{props.data.des}</div>
          <div className="date">{props.data.date}</div>
        </div>
      </div>
      <div className="separate h-[1px] bg-[#5D5D5D] mt-[30px]" />
    </Link>
  );
}
