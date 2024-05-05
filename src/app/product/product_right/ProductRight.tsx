"use client";
import Combobox from "@/src/components/combobox/Combobox";
import ItemProduct from "@/src/components/item_product/ItemProduct";
import Pagination from "@/src/components/pagination/Pagination";
import { Product } from "@/src/interface/product";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { Button } from "@/src/components/ui/button";
import { useSetting } from "@/src/hook/useSetting";
import notFound from "@/public/no_products_found.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/lib/redux/store";
import {
  setFilterBrand,
  setFilterType,
} from "@/src/lib/redux/features/phoneSlice";
import useSWR from "swr";
import { fetchListPhoneApi } from "@/src/api/service/phone";
import Loading from "@/src/components/loading/Loading";

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

export default function ProductRight() {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const setting = useSetting();
  const ref = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [filterPrice, setFilterPrice] = useState<string>("");
  const [dataFilter, setDataFilter] = useState<Product[]>([]);
  const [dataFilterBrand, setDataFilterBrand] = useState<Product[]>([]);

  const quantityItemRender = 18;
  const limitPhonePage = 5;
  const totalPages = Math.ceil(dataFilter?.length / quantityItemRender);

  const startItemIndex = currentPage * quantityItemRender;
  const endItemIndex = startItemIndex + quantityItemRender;

  const currentPageData = dataFilter?.slice(startItemIndex, endItemIndex);

  const phoneList = useSWR("product/product-list", fetchListPhoneApi, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (phoneReducer.filterBrand !== "") {
      const data = phoneList?.data?.data.content.filter((ele: Product) =>
        ele.categoryBrandMapping?.brand.name.includes(phoneReducer.filterBrand)
      );

      if (data.length > 0) {
        setDataFilter(data);
        setDataFilterBrand(data);
      }

      setFilterPrice("");
      dispatch(setFilterType(""));
      setCurrentPage(0);
    } else {
      setDataFilter(phoneList?.data?.data.content);
      setDataFilterBrand([]);
    }
  }, [phoneReducer.filterBrand]);

  useEffect(() => {
    if (phoneReducer.filterType !== "") {
      if (dataFilterBrand.length > 0) {
        const data = dataFilterBrand?.filter((ele) =>
          ele.categoryBrandMapping.category.name.includes(
            phoneReducer.filterType
          )
        );
        setDataFilter(data);
      } else {
        const data = phoneList?.data?.data.content.filter((ele: Product) =>
          ele.categoryBrandMapping.category.name.includes(
            phoneReducer.filterType
          )
        );
        setDataFilter(data);
      }
    }
  }, [phoneReducer.filterType]);

  useEffect(() => {
    if (!hasScrolled) {
      setHasScrolled(true);
    }
    if (hasScrolled) {
      scrollToSection();
    }
  }, [currentPage]);

  useEffect(() => {
    if (filterPrice) {
      priceSearch(filterPrice);
    }
  }, [filterPrice]);

  useEffect(() => {
    if (searchParams.get("brand") !== null) {
      dispatch(setFilterBrand(String(searchParams.get("brand"))));
    } else setDataFilter(phoneList?.data?.data.content);
  }, [phoneList?.data?.data.content]);

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
          phoneList?.data?.data.content
            .slice()
            .sort((a: Product, b: Product) => a.price - b.price)
        );
      }
    } else if (value === "hightolow") {
      if (dataFilterBrand.length > 0) {
        setDataFilter(
          dataFilterBrand.slice().sort((a, b) => b.price - a.price)
        );
      } else {
        setDataFilter(
          phoneList?.data?.data.content
            .slice()
            .sort((a: Product, b: Product) => b.price - a.price)
        );
      }
    } else if (value === "popular") {
      if (dataFilterBrand.length > 0) {
        setDataFilter(dataFilterBrand.filter((item) => item.new_release));
      } else {
        setDataFilter(
          phoneList?.data?.data.content.filter(
            (item: Product) => item.new_release
          )
        );
      }
    }
  };

  const skeletonItem = () => {
    return (
      <div className="relative">
        <div
          className={`skeleton h-[407px] w-[266px] item cursor-pointer bg-[#FFFFFF] rounded-[20px] xl:shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] xl:px-7 px-3 xl:pb-[30px] pb-5 relative transition-all duration-300 xl:mb-0 xl:max-w-none md:max-w-[300px] ml-auto mr-auto md:mb-7 xl:hover:scale-[1.03] xl:hover:shadow-[0_5px_10px_0_rgba(0,0,0,0.3)] shadow-[0_5px_10px_0_rgba(0,0,0,0.05)]`}
        ></div>
      </div>
    );
  };

  return (
    <>
      {phoneList?.data === undefined ? (
        <div className="product_right max-[768px]:p-[10px] min-h-[800px] w-[885px] ml-auto">
          <div className="product_item grid md:grid-cols-3 grid-cols-2 xl:gap-[30px] gap-4 xl:pt-[50px]">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        </div>
      ) : (
        <div
          ref={ref}
          className="product_right max-[768px]:p-[10px] min-h-[800px] w-[885px] ml-auto"
        >
          <div className="filter_phone">
            <div className="min-[1280px]:hidden">
              <div className="total_phone flex justify-between items-center">
                <Button
                  onClick={() => setting.toggleOpen()}
                  className="xl:hidden w-[30px] h-[30px] px-0 bg-white hover:bg-[#ede9e9]"
                >
                  <CgMenuGridR className="text-muted-foreground text-2xl" />
                </Button>
                <div className="dropdown mt-3 flex items-center gap-2">
                  <Combobox
                    frameworks={frameworks}
                    title="sort by"
                    page="product"
                    filterPrice={filterPrice}
                    setFilterPrice={setFilterPrice}
                  />
                </div>
              </div>
              <p className="text-base tracking-wider text-[#AAAAAA] font-medium">
                {dataFilter?.length} Products
              </p>
            </div>
            <div className="max-[1200px]:hidden total_phone flex justify-between items-center">
              <p className="text-base tracking-wider text-[#AAAAAA] font-medium">
                {dataFilter?.length} Products
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
          {currentPageData?.length > 0 ? (
            <div className="product_item grid md:grid-cols-3 grid-cols-2 xl:gap-[30px] gap-4 xl:pt-[50px]">
              {currentPageData?.map((ele) => {
                return <ItemProduct key={ele.id_product} ele={ele} />;
              })}
            </div>
          ) : (
            <div className="relative">
              <Image
                src={notFound.src}
                alt="Not Found"
                width={250}
                height={250}
                className="left-1/2 -translate-x-1/2 absolute"
              />
            </div>
          )}
          <div className="pt-20">
            {totalPages > 1 && (
              <Pagination
                items={currentPageData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                limit={limitPhonePage}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
