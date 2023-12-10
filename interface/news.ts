import { StaticImageData } from "next/image";

export interface newsItem {
  id: number;
  image: StaticImageData;
  title: string;
  date: Date;
}
