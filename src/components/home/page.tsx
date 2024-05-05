"use client";
import Banner from "./banner/Banner";
import Brand from "./brand/Brand";
import News from "./news/News";
import ProductHome from "./product/ProductHome";

export default function HomePage() {

  return (
    <div className="home bg-white">
      <Banner />
      <Brand />
      <ProductHome />
      <News />
    </div>
  );
}
