"use client";
import Banner from "./banner/Banner";
import Brand from "./brand/Brand";
import MainLayout from "../../MainLayout";
import News from "./news/News";
import ProductHome from "./product/ProductHome";
import useSWR from "swr";
import Loading from "@/src/components/loading/Loading";
import { fetchListPhoneApi } from "@/src/api/service/phone";

export default function HomePage() {
  const dataPhoneSWR = useSWR("product/product-list", fetchListPhoneApi, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <>
      {dataPhoneSWR.data === undefined && <Loading />}
      <MainLayout>
        <div className="home bg-white">
          <Banner />
          <Brand />
          <ProductHome phoneList={dataPhoneSWR.data?.data.content} />
          <News />
        </div>
      </MainLayout>
    </>
  );
}
