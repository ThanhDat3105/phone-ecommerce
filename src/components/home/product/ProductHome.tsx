import { fetchListPhoneApi } from "@/src/api/service/phone";
import ListItemProduct from "@/src/components/ListItemProduct/ListItemProduct";
import { Product } from "@/src/interface/product";
import useSWR from "swr";

export default function ProductHome() {
  const dataPhoneSWR = useSWR("product/product-list", fetchListPhoneApi, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const filterPhoneHome = (brand: string) => {
    const result = dataPhoneSWR.data?.data.content?.filter(
      (ele: Product) => ele.categoryBrandMapping?.brand.name === brand
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
