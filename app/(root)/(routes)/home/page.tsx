import React from "react";
import "./home.scss";
import Banner from "./banner/Banner";
import Brand from "./brand/Brand";
import MainLayout from "../../MainLayout";
import Product from "./product/Product";
import News from "./news/News";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="home bg-[#f5f5f5]">
        <Banner />
        <Brand />
        <Product />
        <News />
      </div>
    </MainLayout>
  );
}
