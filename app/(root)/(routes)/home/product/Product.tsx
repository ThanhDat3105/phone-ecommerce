"use client";
import { Product } from "@/interface/product";
import ListItemProduct from "@/app/components/ListItemProduct/ListItemProduct";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Product() {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);

  const filterPhoneHome = (brand: string) => {
    const result = phoneReducer?.phoneList?.filter(
      (ele: Product) => ele.categoryBrandMapping.brand.name === brand
    );
    return result;
  };

  return (
    <div className="product xl:pt-[45px] pt-10 pb-[20px]">
      <div className="container_all flex flex-col gap-[50px]">
        <ListItemProduct
          title="Iphone"
          brand="Apple"
          ele={filterPhoneHome("Apple")?.slice(0, 4)}
        />
        <ListItemProduct
          title="Samsung"
          brand="Samsung"
          ele={filterPhoneHome("Samsung")?.slice(0, 4)}
        />
        <ListItemProduct
          title="Vivo"
          brand="Vivo"
          ele={filterPhoneHome("Vivo")?.slice(0, 4)}
        />
        <ListItemProduct
          title="Oppo"
          brand="Oppo"
          ele={filterPhoneHome("Oppo")?.slice(0, 4)}
        />
      </div>
    </div>
  );
}
