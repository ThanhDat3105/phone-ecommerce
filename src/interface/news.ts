import { StaticImageData } from "next/image";

export interface newsItem {
  id: number;
  img: StaticImageData;
  des: string;
  date: string;
  type: string;
}

export interface newHome {
  id: number;
  image: StaticImageData;
  title: string;
  date: Date;
}
