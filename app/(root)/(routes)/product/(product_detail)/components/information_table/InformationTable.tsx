import QNA from "./Q&A/QNA";
import Description from "./description/Description";
import Specifications from "./specifications/Specifications";

export default function InformationTable() {
  return (
    <div className="information_table">
      {/* <Description />
      <Specifications/> */}
      <QNA />
    </div>
  );
}
