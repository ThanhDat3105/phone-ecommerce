"use client";
import Combobox from "@/app/components/combobox/Combobox";
import ItemProduct from "@/app/components/item_product/ItemProduct";
import Pagination from "@/app/components/pagination/Pagination";
import { companyPhone } from "@/data/mockData";
import { Product } from "@/interface/product";
import { RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const frameworks = [
  {
    value: "popular",
    label: "Popular",
  },
  {
    value: "lowtohigh",
    label: "Price low to high",
  },
  {
    value: "hightolow",
    label: "Price high to low",
  },
];

interface Props {
  filterBrand: string;
  filterType: string;
}

export default function ProductRight(props: Props) {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const ref = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [dataFilter, setDataFilter] = useState<Product[]>(
    phoneReducer.phoneList
  );
  const [dataFilterBrand, setDataFilterBrand] = useState<Product[]>();

  const quantityItemRender = 18;

  const startItemIndex = currentPage * quantityItemRender;
  const endItemIndex = startItemIndex + quantityItemRender;
  const currentPageData = dataFilter?.slice(startItemIndex, endItemIndex);
  const limitPhonePage = 5;
  const totalPages = Math.ceil(dataFilter?.length / quantityItemRender);

  useEffect(() => {
    brandSearching();
  }, [props.filterBrand]);

  useEffect(() => {
    typeSearching();
  }, [props.filterType]);

  useEffect(() => {
    if (!hasScrolled) {
      setHasScrolled(true);
    }
    if (hasScrolled) {
      scrollToSection();
    }
  }, [currentPage]);

  useEffect(() => {
    if (phoneReducer.phoneList) {
      setDataFilter(phoneReducer.phoneList);
    }
  }, [phoneReducer.phoneList]);

  const brandSearching = () => {
    const data = phoneReducer.phoneList?.filter(
      (ele) => ele.categoryBrandMapping.brand.name === props.filterBrand
    );
    setDataFilter(data);
    setDataFilterBrand(data);
  };

  const typeSearching = () => {
    const data = dataFilterBrand?.filter(
      (ele) => ele.categoryBrandMapping.category.name === props.filterType
    );
    if (data) {
      setDataFilter(data);
    }
  };

  const scrollToSection = () => {
    const destination = ref.current;

    if (destination) {
      destination.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="product_right w-[70%] ml-auto">
      <div className="logo_company  flex justify-between items-center">
        {companyPhone.map((ele) => {
          return (
            <div
              key={ele.image.src}
              className="imag px-2 bg-white rounded-[10px] h-[30px] max-h-[30px] max-w-[100px] w-[100px] flex items-center justify-center cursor-pointer"
            >
              <img src={ele.image.src} alt="logo_company" />
            </div>
          );
        })}
      </div>
      <div className="separate h-[1px] bg-[#AAAAAA] my-10" />
      <div className="filter_phone">
        <div className="total_phone flex justify-between items-center">
          <p className="text-base tracking-wider text-[#AAAAAA] font-bold">
            {dataFilter.length} Items
          </p>
          <div className="dropdown flex items-center gap-2">
            <p className="text-xl tracking-wider text-[#AAAAAA]">Sort by:</p>
            <Combobox
              frameworks={frameworks}
              title="Select Option"
              page="product"
            />
          </div>
        </div>
        <div className="filter"></div>
      </div>
      <div
        ref={ref}
        className="product_item grid xl:grid-cols-3 gap-[30px] pt-[50px]"
      >
        {currentPageData.map((ele) => {
          return <ItemProduct key={ele.id_product} ele={ele} />;
        })}
      </div>
      <div className="pt-20">
        <Pagination
          items={currentPageData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          limit={limitPhonePage}
        />
      </div>
    </div>
  );
}
