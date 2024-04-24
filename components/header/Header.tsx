"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "./header.scss";
import Logo from "../icons/icon/Logo";
import useDebounce from "@/hook/useDebounce";
import HeaderMobile from "./components/HeaderMobile";
import HeaderDesktop from "./components/HeaderDesktop";
import useSWR from "swr";
import Loading from "../loading/Loading";

const ModalCart = dynamic(() => import("../modal_cart/ModalCart"), {
  ssr: false,
  loading: () => <Loading />,
});
const ModalMenu = dynamic(() => import("./components/ModalMenu"), {
  ssr: false,
  loading: () => <Loading />,
});

import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Product } from "@/interface/product";
import { fetchListPhoneApi } from "@/api/service/phone";

export default function Header() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathName = usePathname();
  const [login, setLogin] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [filterPhoneSearch, setFilterPhoneSearch] = useState<Product[]>([]);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [headerOpen, setHeaderOpen] = useState<boolean>(true);
  const [mobile, setMobile] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);

  let debounceSearch = useDebounce(valueSearch, 200);

  const dataPhoneSWR = useSWR("product/product-list", fetchListPhoneApi, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("USER_INFO_KEY");
      if (user) {
        setLogin(true);
      }
    }

    if (Number(headerRef.current?.clientWidth) <= 850) {
      setMobile(true);
    }

    if (typeof window !== "undefined") {
      let presentHeight = 0;
      window.addEventListener("scroll", function () {
        const scrollPosition = window.scrollY || window.pageYOffset;
        if (scrollPosition > presentHeight) {
          presentHeight = scrollPosition;
          setHeaderOpen(false);
        } else {
          presentHeight = scrollPosition;
          setHeaderOpen(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (pathName !== "/cart") setHeaderOpen(true);
  }, [phoneReducer.cartList]);

  useEffect(() => {
    if (debounceSearch !== "") filterPhone();
  }, [debounceSearch]);

  const setHeight = () => {
    if (dropdownRef?.current) {
      const clientHeight = Number(dropdownRef.current.clientHeight);
      if (clientHeight > 0) {
        dropdownRef.current.style.height = "0px";
        debounceSearch = "";
      } else {
        dropdownRef.current.style.height =
          dropdownRef.current.scrollHeight + "px";
      }
    }
  };

  const handleFocus = () => {
    setInputFocus(true);
  };

  const handleBlur = () => {
    setInputFocus(false);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target?.value);
  };

  const filterPhone = () => {
    const filterPhone = dataPhoneSWR?.data?.data?.content.filter(
      (ele: Product) => {
        return (
          ele.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase()
            .indexOf(valueSearch?.toLowerCase()) !== -1
        );
      }
    );

    if (filterPhone.length > 0) setFilterPhoneSearch(filterPhone);
  };

  const handleLogOut = () => {
    if (login) {
      localStorage.removeItem("USER_INFO_KEY");
      setLogin(false);
      setHeight();
      toast.success("Log out successfully");
    }
  };

  const handleClose = () => {
    if (show) {
      setShow(false);
      document.querySelector(".modal_cart")?.classList.add("close");
    }
  };

  return (
    <>
      <div
        ref={headerRef}
        className={`header transition-all duration-300 fixed w-full !z-[100] bg-white drop-shadow-md ${
          headerOpen ? "translate-y-[0px]" : "translate-y-[-70px]"
        }`}
      >
        <div className="container_all flex justify-between items-center text-white md:h-[70px] h-[60px]">
          <div
            onClick={() => router.push("/")}
            className="header_logo cursor-pointer xl:w-10 xl:h-10 w-[35px] h-[35px]"
          >
            <Logo />
          </div>
          {mobile ? (
            <HeaderMobile
              inputFocus={inputFocus}
              handleChangeSearch={handleChangeSearch}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
              setShow={setShow}
              cartList={phoneReducer.cartList}
              filterPhoneSearch={filterPhoneSearch}
              setShowMenu={setShowMenu}
              showMenu={showMenu}
              debounceSearch={debounceSearch}
            />
          ) : (
            <HeaderDesktop
              inputFocus={inputFocus}
              handleChangeSearch={handleChangeSearch}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
              dropdownRef={dropdownRef}
              login={login}
              setHeight={setHeight}
              cartList={phoneReducer.cartList}
              debounceSearch={debounceSearch}
              setShow={setShow}
              filterPhoneSearch={filterPhoneSearch}
              handleLogOut={handleLogOut}
              pathName={pathName}
            />
          )}
        </div>
      </div>
      <div
        onClick={() => handleClose()}
        className={`bg_opacity ${show ? "show" : "hide"} `}
      />
      {show && (
        <ModalCart show={show} setShow={setShow} handleClose={handleClose} />
      )}
      {mobile && (
        <ModalMenu
          pathName={pathName}
          handleLogOut={handleLogOut}
          login={login}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      )}
    </>
  );
}
