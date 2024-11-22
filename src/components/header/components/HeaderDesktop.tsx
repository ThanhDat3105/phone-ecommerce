import { Button } from "@/src/components/ui/button";
import { CartItem, PhoneResType } from "@/src/interface/product";
import { formatPrice } from "@/src/utils/price";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IoMdPerson } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

interface Props {
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  setShow: (value: boolean) => void;
  handleLogOut: () => void;
  setHeight: () => void;
  setShowMenu: (value: boolean) => void;
  inputFocus: boolean;
  showMenu: boolean;
  cartList: CartItem[];
  dropdownRef: RefObject<HTMLDivElement> | null;
  login: boolean;
  debounceSearch: string;
  filterPhoneSearch: PhoneResType[];
  pathName: string;
}

export default function HeaderDesktop(props: Props) {
  const refSearch = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [debounceSearch, setDebounceSearch] = useState<string>("");

  const handleButtonOrder = () => {
    props.setHeight();
    router.push("/order-list");
  };

  const handleNavigateToDetail = () => {
    setDebounceSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (refSearch.current && !refSearch.current.contains(event.target)) {
        setDebounceSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDebounceSearch(props.debounceSearch);
  }, [props.debounceSearch]);

  return (
    <>
      <div className="header_menu flex gap-[55px] text-black">
        <div className="item_menu category cursor-pointer relative items-center md:inline-block hidden">
          <div
            role="button"
            onClick={() => router.push("/product")}
            className={`text-base ${
              props.pathName === "/product" ? "font-bold" : "font-normal"
            }`}
          >
            All Categories
          </div>
        </div>
        <div className="item_menu relative md:inline-block hidden">
          <div
            onClick={() => router.push("/news")}
            role="button"
            className={`text-base ${
              props.pathName === "/news" ? "font-bold" : "font-normal"
            }`}
          >
            News
          </div>
        </div>
      </div>
      <div className="header_info flex sm:gap-8 xs:gap-4 gap-2">
        <div
          className={`header_find relative flex items-center border-b-[2px]  ${
            props.inputFocus
              ? "border-[#a5a7ac] border-b-2 "
              : "border-transparent"
          }`}
        >
          <input
            type="text"
            placeholder="Search Product"
            className="input_find pl-0 text-black focus-visible:outline-none py-[10px] sm:w-[150px] w-20"
            onChange={props.handleChangeSearch}
            onFocus={props.handleFocus}
            onBlur={props.handleBlur}
          />
          <Button
            variant="ghost"
            size={"icon"}
            className="button_Magnifying rounded-[30px] max-h-[30px] duration-300 justify-end hover:bg-transparent"
          >
            <HiOutlineMagnifyingGlass className="text-xl text-black" />
          </Button>
          {debounceSearch !== "" && (
            <div
              ref={refSearch}
              className="active absolute bg-white w-[270px] left-[-40px] h-[350px] top-[146%] rounded-b-[15px] overflow-auto"
            >
              {props.filterPhoneSearch && props.filterPhoneSearch.length > 0 ? (
                props.filterPhoneSearch?.map((ele: PhoneResType) => {
                  return (
                    <Link
                      style={{ textDecoration: "none" }}
                      className="item_phone  py-4 transition-all duration-300 flex cursor-pointer gap-[10px] bg-white px-[5px] hover:bg-[#f5f5f5]"
                      key={ele.id_product}
                      href={`/product/${ele.id_product}`}
                      onClick={handleNavigateToDetail}
                    >
                      <div className="image w-[60px] h-[60px] relative">
                        <Image fill src={ele.thumbnail} alt={ele.name} />
                      </div>
                      <div className="info flex flex-col justify-center">
                        <div className="name text-xs text-black font-semibold">
                          {ele.name}
                        </div>
                        <div className="price">
                          <div className="price_sale text-sm text-black">
                            {formatPrice(Number(ele.price))}đ
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-black text-xl font-semibold relative top-[50%] left-[50%] text-center translate-x-[-50%] translate-y-[-50%]">
                  No suitable phone found
                </div>
              )}
            </div>
          )}
        </div>
        <div className="header_cart relative">
          <Button
            onClick={() => props.setShow(true)}
            size={"icon"}
            className="button_bag rounded-[50%] bg-white text-black transition-all duration-300 hover:bg-black hover:text-white"
          >
            <FaShoppingBag className="icon_bag text-[20px]" />
          </Button>
          {props.cartList.length > 0 && (
            <span className="absolute bg-black text-white rounded-full w-auto text-center text-[12px] left-[22px] top-[3px] leading-[12px] p-[4px] min-w-[20px]">
              {props.cartList.length}
            </span>
          )}
        </div>
        <div className="header_user relative">
          <Button
            onClick={() => props.setHeight()}
            size={"icon"}
            className="button_person rounded-[50%] bg-white text-black transition-all duration-300 hover:bg-black hover:text-white md:flex hidden"
          >
            <IoMdPerson className="icon_person text-2xl" />
          </Button>
          <Button
            onClick={() => props.setShowMenu(!props.showMenu)}
            size={"icon"}
            className="button_person rounded-[50%] bg-white text-black transition-all duration-300 hover:bg-black hover:text-white md:hidden"
          >
            <IoMenu className="text-3xl cursor-pointer" />
          </Button>
          <div
            ref={props.dropdownRef}
            className="dropdown_user absolute h-0 overflow-hidden w-[150px] top-[140%] rounded-b-[5px] right-[50%] translate-x-[50%] transition-all duration-300"
          >
            {!props.login ? (
              <>
                <div
                  className="login px-5 py-3 cursor-pointer bg-white text-black hover:bg-[#f5f5f5] transition-all duration-300"
                  onClick={() => {
                    router.push("/sign_in?urlBack=/"), props.setHeight();
                  }}
                >
                  Login
                </div>
                <div
                  className="register px-5 py-3 bg-white text-black cursor-pointer hover:bg-[#f5f5f5] transition-all duration-300"
                  onClick={() => {
                    router.push("/sign_up"), props.setHeight();
                  }}
                >
                  Register
                </div>
              </>
            ) : (
              <>
                <div
                  className="px-5 py-3 flex items-center justify-between cursor-pointer bg-white text-black hover:bg-[#f5f5f5] transition-all duration-300"
                  onClick={() => handleButtonOrder()}
                >
                  Order list
                </div>
                <div
                  className="px-5 py-3 flex items-center justify-between cursor-pointer bg-white text-black hover:bg-[#f5f5f5] transition-all duration-300"
                  onClick={() => props.handleLogOut()}
                >
                  Log out
                  <LogOut size={15} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
