"use client";

import MainLayout from "@/app/(root)/MainLayout";
import { IoIosArrowForward } from "react-icons/io";
import RelatedProduct from "../components/related_products/RelatedProduct";
import InformationTable from "../components/information_table/InformationTable";
import InfoDetail from "../components/info_detail/InfoDetail";
import { useEffect, useState } from "react";
import { Product } from "@/interface/product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  FindProductByIdAction,
  fetchListPhoneAction,
} from "@/redux/features/phoneSlice";
import Loading from "@/app/components/loading/Loading";
import { useRouter } from "next/navigation";
interface Props {
  params: { id: number };
}

export default function DetailProduct(props: Props) {
  const router = useRouter();
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [phoneInfo, setPhoneInfo] = useState<Product>();

  const findProductById = (id: number) => {
    dispatch(FindProductByIdAction(id));
  };

  const fetchPhoneList = () => {
    dispatch(fetchListPhoneAction());
  };

  useEffect(() => {
    findProductById(props.params.id);

    if (!phoneReducer.phoneInfo) {
      fetchPhoneList();
    }
  }, []);

  useEffect(() => {
    if (phoneReducer.phoneInfo) {
      setPhoneInfo(phoneReducer.phoneInfo);
    }
  }, [phoneReducer.phoneInfo]);

  return (
    <MainLayout>
      {phoneReducer.isLoading && <Loading />}
      {phoneReducer.isLoading ? (
        <div className="min-h-[600px]"></div>
      ) : (
        <div className="product_detail pt-[120px] bg-white">
          <div className="container_all">
            <div className="menu_back flex text-[#5D5D5D] tracking-wider gap-6">
              <p
                onClick={() => router.push("/")}
                className="cursor-pointer transition-all duration-300 hover:text-black"
              >
                Home
              </p>
              <IoIosArrowForward className="cursor-pointer" />
              <p
                onClick={() =>
                  router.push(
                    `/product?brand=${phoneInfo?.categoryBrandMapping.brand.name}`
                  )
                }
                className="cursor-pointer hover:text-black transition-all duration-300"
              >
                {phoneInfo?.categoryBrandMapping.brand.name}
              </p>
              <IoIosArrowForward className="cursor-pointer" />
              <p className="text-black cursor-pointer">{phoneInfo?.name}</p>
            </div>
            <InfoDetail ele={phoneInfo} key={phoneInfo?.id_product} />
            <RelatedProduct
              ele={phoneReducer.phoneList}
              brand={phoneReducer.phoneInfo?.categoryBrandMapping.brand.name}
            />
          </div>
          <div className="information">
            <div className="button_information"></div>
            <InformationTable info={phoneInfo} />
          </div>
        </div>
      )}
    </MainLayout>
  );
}
