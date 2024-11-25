
import phoneApiRequest from "@/src/apiRequest/phone";
import InfoDetail from "@/src/components/detail_phone/info_detail/InfoDetail";
import InformationTable from "@/src/components/detail_phone/information_table/InformationTable";
import MenuBack from "@/src/components/detail_phone/menu_back/MenuBack";
import RelatedProduct from "@/src/components/detail_phone/related_products/RelatedProduct";

interface Props {
  params: { id: number };
}

export default async function DetailProduct(props: Props) {
  const phoneList = await phoneApiRequest.fetchListPhoneApi();
  const phoneInfo = await phoneApiRequest.findDetailPhoneById(props.params.id);

  return (
    <>
      {phoneInfo?.payload && phoneList?.payload && (
        <div className="product_detail xl:pt-[120px] min-[768px]:pt-[100px] pt-[90px] bg-white">
          <div className="container_all">
            <MenuBack phone={phoneInfo.payload}/>
            <InfoDetail detailPhone={phoneInfo.payload} />
            <RelatedProduct
              phoneList={phoneList.payload}
              info={phoneInfo.payload}
            />
            <div className="information">
              <div className="button_information"></div>
              <InformationTable info={phoneInfo.payload} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
