import ListItemProduct from "@/app/components/ListItemProduct/ListItemProduct";
import { Product } from "@/interface/product";

interface Props {
  filterPhoneHome: (value: string) => Product[];
}

export default function ProductHome(props: Props) {
  return (
    <div className="product xl:pt-[45px] pt-10 pb-[20px]">
      <div className="container_all flex flex-col gap-[50px]">
        <ListItemProduct
          title="Iphone"
          brand="Apple"
          ele={props.filterPhoneHome("Apple")?.slice(0, 4)}
        />
        <ListItemProduct
          title="Samsung"
          brand="Samsung"
          ele={props.filterPhoneHome("Samsung")?.slice(0, 4)}
        />
        <ListItemProduct
          title="Vivo"
          brand="Vivo"
          ele={props.filterPhoneHome("Vivo")?.slice(0, 4)}
        />
        <ListItemProduct
          title="Oppo"
          brand="Oppo"
          ele={props.filterPhoneHome("Oppo")?.slice(0, 4)}
        />
      </div>
    </div>
  );
}
