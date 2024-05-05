import ProductLeft from "./product_left/ProductLeft";
import ProductRight from "./product_right/ProductRight";

export default function ProductPage() {
  return (
    <div className="filter xl:pt-[130px] min-[768px]:pt-[80px] pt-[70px] bg-white pb-[130px]">
      <div className="container_all xl:!px-[10px] !p-0">
        <div className="content xl:flex gap-10 relative">
          <ProductLeft />
          <ProductRight />
        </div>
      </div>
    </div>
  );
}
