import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import "./multiCarousel.scss";
import { Image } from "@/interface/product";

interface Props {
  image: Image[] | undefined;
}

export default function MultiCarousel(props: Props) {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto top-[80px]">
      <Carousel
        showArrows={false}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        swipeable={true}
        emulateTouch={true}
        className="productCarousel"
      >
        {props.image?.map((ele) => {
          return <img src={ele.url} key={ele.url} alt="image" />;
        })}
      </Carousel>
    </div>
  );
}
