import ItemNews from "./item_news/ItemNews";

import image1 from "@/public/image/home/news/iphone 15pm news.webp";
import image2 from "@/public/image/home/news/raytraycing-removebg-preview.png";
import image3 from "@/public/image/home/news/break ip.jpg";

export default function News() {
  const data = [
    {
      id: 1,
      image: image1,
      title: "smartphone có thể thay thế máy ảnh?",
      date: new Date("September 29, 2023"),
    },
    {
      id: 2,
      image: image2,
      title:
        "Ray Tracing trên smartphone? Liệu đây sẽ là boom tấn hay boom sịt của apple.",
      date: new Date("September 19, 2023"),
    },
    {
      id: 3,
      image: image3,
      title:
        "Iphone 15pro series năm nay sẽ có khung titanium liệu có bền hơn?",
      date: new Date("September 19, 2023"),
    },
  ];
  return (
    <div className="news bg-white xl:pb-28 md:pb-16 pb-16">
      <div className="container_all">
        <div className="title text-3xl tracking-wider text-center pt-[70px] xl:pb-[50px] md:pb-[40px] pb-[40px]">
          News
        </div>
        <div className="content grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 xl:gap-[55px] md:gap-5 gap-10">
          {data.map((ele) => {
            return <ItemNews key={ele.id} ele={ele} />;
          })}
        </div>
      </div>
    </div>
  );
}
