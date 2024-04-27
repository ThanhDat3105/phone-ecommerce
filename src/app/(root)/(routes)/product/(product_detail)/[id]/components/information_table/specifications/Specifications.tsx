import { Product } from "@/src/interface/product";

interface Props {
  info: Product | undefined;
}

export default function Specifications(props: Props) {
  return (
    <div className="specifications pb-10 bg-white">
      <div className="xl:container_all px-[10px]">
        <div className="item xl:text-base text-sm py-[30px] items-center flex bg-[#FFFFFF]">
          <div className="left pl-[10px] uppercase xl:pl-10 w-[50%]">
            <p>Operating system</p>
          </div>
          <div className="right max-w-[250px] lg:max-w-[400px] mr-auto ml-auto xl:text-base text-sm w-[50%]">
            <p>
              {props.info?.categoryBrandMapping?.brand.name === "Apple"
                ? "IOS "
                : "Android "}
              is the world&apos;s most secure and personal operating system for
              mobile phones, packed with powerful features and designed to
              protect your privacy.
            </p>
          </div>
        </div>
        <div className="item xl:text-base text-sm py-[30px] items-center flex bg-[#EFEFEF]">
          <div className="left pl-[10px] uppercase xl:pl-10 w-[50%]">
            <p>color</p>
          </div>
          <div className="right max-w-[250px] lg:max-w-[400px] mr-auto ml-auto xl:text-base text-sm w-[50%]">
            <p>
              Black Titanium <br />
              White Titanium <br />
              Blue Titanium <br />
            </p>
          </div>
        </div>
        {props.info?.categoryBrandMapping.category.name !== "Headphone" && (
          <>
            <div className="item xl:text-base text-sm py-[30px] items-center flex bg-[#FFFFFF]">
              <div className="left pl-[10px] uppercase xl:pl-10 w-[50%]">
                <p>screen</p>
              </div>
              <div className="right max-w-[250px] lg:max-w-[400px] mr-auto ml-auto xl:text-base text-sm w-[50%]">
                <p>{props.info?.screen}</p>
              </div>
            </div>
            <div className="item xl:text-base text-sm py-[30px] items-center flex bg-[#EFEFEF]">
              <div className="left pl-[10px] uppercase xl:pl-10 w-[50%]">
                <p>Rear camera</p>
              </div>
              <div className="right max-w-[250px] lg:max-w-[400px] mr-auto ml-auto xl:text-base text-sm w-[50%]">
                <p>{props.info?.rear_camera}</p>
              </div>
            </div>
            <div className="item xl:text-base text-sm py-[30px] items-center flex bg-[#FFFFFF]">
              <div className="left pl-[10px] uppercase xl:pl-10 w-[50%]">
                <p>Front camera</p>
              </div>
              <div className="right max-w-[250px] lg:max-w-[400px] mr-auto ml-auto xl:text-base text-sm w-[50%]">
                <p>{props.info?.front_camera}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
