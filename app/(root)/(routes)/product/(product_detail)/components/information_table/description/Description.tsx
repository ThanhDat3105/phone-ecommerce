import des1 from "@/public/image/product/description/Frame 43.png";
import des2 from "@/public/image/product/description/Frame 45.png";
import des3 from "@/public/image/product/description/Frame 46.png";
import des4 from "@/public/image/product/description/Frame 47.png";
import des5 from "@/public/image/product/description/Frame 48.png";
import des6 from "@/public/image/product/description/Frame 49.png";
import des7 from "@/public/image/product/description/Frame 50.png";
import des8 from "@/public/image/product/description/Frame 51.png";
import des9 from "@/public/image/product/description/Frame 52.png";
import des10 from "@/public/image/product/description/Frame 53.png";

export default function Description() {
  return (
    <div className="description">
      <div className="top">
        <img src={des1.src} alt="image" className="w-full h-full" />
      </div>
      <div className="bottom bg-[#333333] pt-[60px] pb-[150px]">
        <div className="container_bottom xl:w-[850px] mr-auto ml-auto">
          <div className="item flex gap-5">
            <img
              src={des2.src}
              alt="image"
              className="xl:w-full w-[45%] h-full"
            />
            <img
              src={des3.src}
              alt="image"
              className="xl:w-full w-[45%] h-full"
            />
          </div>
          <div className="item flex gap-5 pt-[60px]">
            <img
              src={des4.src}
              alt="image"
              className="xl:w-full w-[45%] h-full"
            />
            <img
              src={des5.src}
              alt="image"
              className="xl:w-full w-[45%] h-full"
            />
          </div>
          <div className="item flex gap-5 pt-[60px]">
            <img
              src={des6.src}
              alt="image"
              className="xl:w-full w-[45%] h-full"
            />
            <img
              src={des7.src}
              alt="image"
              className="xl:w-full w-[45%] h-full"
            />
          </div>
          <div className="item">
            <div className="item flex gap-5 pt-[60px]">
              <img
                src={des8.src}
                alt="image"
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="item flex gap-5 pt-[60px]">
            <img
              src={des9.src}
              alt="image"
              className="xl:w-full w-[45%] h-full"
            />
            <img
              src={des10.src}
              alt="image"
              className="xl:w-full w-[45%] h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
