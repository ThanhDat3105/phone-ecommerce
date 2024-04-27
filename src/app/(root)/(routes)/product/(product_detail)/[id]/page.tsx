"use client";

import MainLayout from "@/src/app/(root)/MainLayout";
import { IoIosArrowForward } from "react-icons/io";
import RelatedProduct from "./components/related_products/RelatedProduct";
import InformationTable from "./components/information_table/InformationTable";
import InfoDetail from "./components/info_detail/InfoDetail";
import Loading from "@/src/components/loading/Loading";
import { useRouter } from "next/navigation";
import { fetchListPhoneApi, findProductByIdApi } from "@/src/api/service/phone";
import useSWR from "swr";
interface Props {
  params: { id: number };
}

export default function DetailProduct(props: Props) {
  const router = useRouter();

  const optionSWR = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };

  const PhoneInfo = useSWR(
    `product/find-product/${props.params.id}`,
    findProductByIdApi
  );

  const phoneList = useSWR(
    "product/product-list",
    fetchListPhoneApi,
    optionSWR
  );

  const phone = PhoneInfo.data?.data.content;

  return (
    <MainLayout>
      {PhoneInfo.data === undefined ? (
        <div className="min-h-screen">
          <Loading />
        </div>
      ) : (
        <div className="product_detail xl:pt-[120px] min-[768px]:pt-[100px] pt-[90px] bg-white">
          <div className="container_all">
            <div className="menu_back flex xl:text-base text-sm text-[#5D5D5D] tracking-wider gap-6">
              <p
                onClick={() => router.push("/home")}
                className="cursor-pointer transition-all duration-300 hover:text-black"
              >
                Home
              </p>
              <IoIosArrowForward className="cursor-pointer" />
              <p
                onClick={() =>
                  router.push(
                    `/product?brand=${phone?.categoryBrandMapping?.brand?.name}`
                  )
                }
                className="cursor-pointer hover:text-black transition-all duration-300"
              >
                {phone?.categoryBrandMapping?.brand?.name}
              </p>
              <IoIosArrowForward className="cursor-pointer" />
              <p className="text-black cursor-pointer">{phone?.name}</p>
            </div>
            <InfoDetail
              ele={PhoneInfo.data?.data.content}
              key={phone?.id_product}
            />
            <RelatedProduct
              phoneList={phoneList.data?.data.content}
              info={PhoneInfo.data?.data.content}
            />
            <div className="information">
              <div className="button_information"></div>
              <InformationTable info={PhoneInfo.data?.data.content} />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
