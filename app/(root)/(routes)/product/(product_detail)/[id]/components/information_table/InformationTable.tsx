import { Product } from "@/interface/product";
import Description from "./description/Description";
import Specifications from "./specifications/Specifications";

interface Props {
  info: Product | undefined;
}
export default function InformationTable(props: Props) {
  return (
    <div className="information_table">
      {props.info?.name.includes("iPhone 15 Pro") ? <Description /> : ""}
      <Specifications info={props.info} />
      {/* <QNA /> */}
    </div>
  );
}
