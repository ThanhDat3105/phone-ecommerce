import brandApiRequest from "@/src/apiRequest/brand";
import ProductLeft from "./product_left/ProductLeft";
import ProductRight from "./product_right/ProductRight";
import categoryApiRequest from "@/src/apiRequest/category";
import phoneApiRequest from "@/src/apiRequest/phone";

export default async function ProductPage() {
  const brandList = await brandApiRequest.fetchListBrandApi();
  const categoryList = await categoryApiRequest.fetchListCategoryApi();
  const phoneList = await phoneApiRequest.fetchListPhoneApi();

  return (
    <div className="filter xl:pt-[130px] min-[768px]:pt-[80px] pt-[70px] bg-white pb-[130px]">
      <div className="container_all xl:!px-[10px] !p-0">
        <div className="content xl:flex gap-10 relative">
          {brandList?.payload &&
            categoryList?.payload &&
            phoneList?.payload && (
              <>
                <ProductLeft
                  brandList={brandList?.payload}
                  categoryList={categoryList?.payload}
                />
                <ProductRight phoneList={phoneList.payload} />
              </>
            )}
        </div>
      </div>
    </div>
  );
}
