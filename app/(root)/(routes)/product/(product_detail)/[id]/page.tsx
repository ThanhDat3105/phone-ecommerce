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
import { FindProductByIdAction } from "@/redux/features/phoneSlice";

interface Props {
  params: { id: number };
}

export default function Page(props: Props) {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [phoneInfo, setPhoneInfo] = useState<Product>();

  const findProductById = (id: number) => {
    dispatch(FindProductByIdAction(id));
  };

  useEffect(() => {
    findProductById(props.params.id);
  }, []);

  useEffect(() => {
    if (phoneReducer.phoneInfo) {
      setPhoneInfo(phoneReducer.phoneInfo);
    }
  }, [phoneReducer.phoneInfo]);
  return (
    <MainLayout>
      <div className="product_detail pt-[120px] bg-white">
        <div className="container_all">
          <div className="menu_back flex text-[#5D5D5D] tracking-wider gap-6 ">
            <p className="cursor-pointer transition-all duration-300 hover:text-black">
              Home
            </p>
            <IoIosArrowForward className="cursor-pointer" />
            <p className="cursor-pointer hover:text-black transition-all duration-300">
              Iphone
            </p>
            <IoIosArrowForward className="cursor-pointer" />
            <p className="text-black cursor-pointer">IPhone 15 Pro Max 512GB</p>
          </div>
          <InfoDetail ele={phoneInfo} key={phoneInfo?.id_product} />
          <RelatedProduct ele={phoneReducer.phoneList} />
        </div>
        <div className="information">
          <div className="button_information"></div>
          <InformationTable />
        </div>
      </div>
    </MainLayout>
  );
}
