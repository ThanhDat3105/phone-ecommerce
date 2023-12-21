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
  const [filterPrice, setFilterPrice] = useState<string>("");
  const [dataFilter, setDataFilter] = useState<Product[]>(
    phoneReducer.phoneList
  );
  const [dataFilterBrand, setDataFilterBrand] = useState<Product[]>([]);

  const quantityItemRender = 18;

  const startItemIndex = currentPage * quantityItemRender;
  const endItemIndex = startItemIndex + quantityItemRender;
  const currentPageData = dataFilter?.slice(startItemIndex, endItemIndex);
  const limitPhonePage = 5;
  const totalPages = Math.ceil(dataFilter?.length / quantityItemRender);

  useEffect(() => {
    brandSearching();
    setFilterPrice("");
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

  useEffect(() => {
    if (filterPrice) {
      priceSearch(filterPrice);
    }
  }, [filterPrice]);

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

  const priceSearch = (value: string) => {
    if (value === "lowtohigh") {
      if (dataFilterBrand.length > 0) {
        setDataFilter(
          dataFilterBrand.slice().sort((a, b) => a.price - b.price)
        );
      } else {
        setDataFilter(
          phoneReducer.phoneList.slice().sort((a, b) => a.price - b.price)
        );
      }
    } else if (value === "hightolow") {
      if (dataFilterBrand.length > 0) {
        setDataFilter(
          dataFilterBrand.slice().sort((a, b) => b.price - a.price)
        );
      } else {
        setDataFilter(
          phoneReducer.phoneList.slice().sort((a, b) => b.price - a.price)
        );
      }
    } else if (value === "popular") {
      if (dataFilterBrand.length > 0) {
        setDataFilter(dataFilterBrand.filter((item) => item.new_release));
      } else {
        setDataFilter(
          phoneReducer.phoneList.filter((item) => item.new_release)
        );
      }
    }
  };

  return (
    <div className="product_right min-h-[800px] w-[70%] ml-auto">
      <div className="filter_phone">
        <div className="total_phone flex justify-between items-center">
          <p className="text-base tracking-wider text-[#AAAAAA] font-medium">
            {dataFilter.length} Products
          </p>
          <div className="dropdown flex items-center gap-2">
            <Combobox
              frameworks={frameworks}
              title="sort by"
              page="product"
              filterPrice={filterPrice}
              setFilterPrice={setFilterPrice}
            />
          </div>
        </div>
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
