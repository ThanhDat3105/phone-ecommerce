import { Button } from "@/src/components/ui/button";
import { PhoneResType } from "@/src/interface/product";
import { TiArrowSortedUp } from "react-icons/ti";

interface Props {
  items: PhoneResType[] | undefined;
  setCurrentPage: (value: number) => void;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export default function Pagination(props: Props) {
  const number: JSX.Element[] = [];

  const renderNumber = () => {
    const totalPages = props.totalPages;
    const currentPage = props.currentPage;

    if (totalPages >= 0 && currentPage >= 0 && currentPage < totalPages) {
      let limit = totalPages >= 5 ? props.limit : totalPages;

      let startPage = Math.max(1, currentPage + 1 - Math.floor(limit / 2)); // 3

      startPage = Math.min(startPage, totalPages - limit + 1); // 3, 8-6 =2
      startPage = Math.max(1, startPage);

      for (let i = startPage; i < startPage + limit; i++) {
        number.push(
          <button
            onClick={() => {
              props.setCurrentPage(i - 1);
            }}
            key={i}
            className={
              i === currentPage + 1
                ? "active bg-black text-white py-[10px] px-[15px] rounded-md"
                : "py-[10px] px-[15px]"
            }
          >
            {i}
          </button>
        );
      }
    }
  };

  renderNumber();

  return (
    <div className="flex justify-between items-center bg-white rounded-[50px] py-[15px] shadow-[0_5px_10px_0_rgb(0,0,0,0.3)]">
      <div className="button_prev ml-4 flex">
        <Button
          onClick={() => {
            props.setCurrentPage(props.currentPage - 1);
          }}
          disabled={props.currentPage === 0}
          className="p-0 h-auto rounded-[50%]"
        >
          <TiArrowSortedUp className="text-4xl rotate-[-90deg]" />
        </Button>
      </div>
      <div className="number_pagination flex xs:gap-16 gap-3">{number}</div>
      <div className="button_next mr-4 flex">
        <Button
          onClick={() => {
            props.setCurrentPage(props.currentPage + 1);
          }}
          disabled={props.currentPage === props.totalPages - 1}
          className="p-0 h-auto rounded-[50%]"
        >
          <TiArrowSortedUp className="text-4xl rotate-[90deg]" />
        </Button>
      </div>
    </div>
  );
}
