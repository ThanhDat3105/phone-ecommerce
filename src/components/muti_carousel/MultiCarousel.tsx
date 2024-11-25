import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./multiCarousel.scss";
interface Props {
  images: {
    original: string;
    thumbnail: string;
  }[];
}

export default function MultiCarousel({ images }: Props) {
  return (
      <ImageGallery showPlayButton={false} showNav={false} items={images} />
  );
}
