import phoneApiRequest from "@/src/apiRequest/phone";
import ListItemProduct from "@/src/components/home/ListItemProduct/ListItemProduct";
import { PhoneResType } from "@/src/interface/product";

export default async function ProductHome() {
  const phoneList = await phoneApiRequest.fetchListPhoneApi();

  const filterPhoneHome = (brand: string) => {
    const result = phoneList.payload.filter(
      (ele: PhoneResType) => ele.categoryBrandMapping?.brand.name === brand
    );
    return result;
  };

  return (
    <div className="product xl:pt-[45px] pt-10 pb-[20px]">
      <div className="container_all flex flex-col xl:gap-28 gap-8">
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
