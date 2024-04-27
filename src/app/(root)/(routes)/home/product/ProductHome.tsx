import ListItemProduct from "@/src/components/ListItemProduct/ListItemProduct";
import { Product } from "@/src/interface/product";

interface Props {
  phoneList: Product[];
}

export default function ProductHome(props: Props) {
  const filterPhoneHome = (brand: string) => {
    const result = props.phoneList?.filter(
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
