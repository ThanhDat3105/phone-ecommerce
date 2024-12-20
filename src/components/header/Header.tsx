"use client";

import "./header.scss";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import useDebounce from "@/src/hook/useDebounce";
import HeaderDesktop from "./components/HeaderDesktop";
import useSWR from "swr";
import Cookies from "js-cookie";

const ModalCart = dynamic(
  () => import("@/src/components/modal_cart/ModalCart"),
  {
    ssr: false,
  }
);

const ModalMenu = dynamic(() => import("./components/ModalMenu"), {
  ssr: false,
});

import { useSelector } from "react-redux";
import { RootState } from "@/src/lib/redux/store";
import phoneApiRequest from "@/src/apiRequest/phone";
import { PhoneResType } from "@/src/interface/product";
import authApiRequest from "@/src/apiRequest/auth";
import { toast } from "sonner";
import Logo from "@/src/components/icons/icon/Logo";
import Loading from "@/src/app/loading";

export default function Header() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathName = usePathname();
  const [login, setLogin] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [filterPhoneSearch, setFilterPhoneSearch] = useState<PhoneResType[]>(
    []
  );
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [headerOpen, setHeaderOpen] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let debounceSearch = useDebounce(valueSearch, 200);

  const dataPhoneSWR = useSWR(
    "product/product-list",
    phoneApiRequest.fetchListPhoneApi,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

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
    if (dataPhoneSWR.data?.payload) {
      const filter = dataPhoneSWR.data.payload.filter((ele: PhoneResType) => {
        return (
          ele.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase()
            .indexOf(valueSearch?.toLowerCase()) !== -1
        );
      });
      if (filter.length > 0) setFilterPhoneSearch(filter);
    }
  };

  const handleLogOut = async () => {
    if (login) {
      setIsLoading(true);
      setHeight();
      const userLogout = await authApiRequest.logoutFromClientToNextServer(
        false
      );
      if (userLogout.status === 200) {
        location.href = "/";
        setLogin(false);
        toast.success("Log out successfully");
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    if (show) {
      setShow(false);
      document.querySelector(".modal_cart")?.classList.add("close");
    }
  };

  useEffect(() => {
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

        if (scrollPosition === 0) {
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

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}
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
            setShowMenu={setShowMenu}
            showMenu={showMenu}
            filterPhoneSearch={filterPhoneSearch}
            handleLogOut={handleLogOut}
            pathName={pathName}
          />
        </div>
      </div>
      <div
        onClick={() => handleClose()}
        className={`bg_opacity ${show ? "show" : "hide"} `}
      />
      {show && (
        <ModalCart show={show} setShow={setShow} handleClose={handleClose} />
      )}

      <ModalMenu
        pathName={pathName}
        handleLogOut={handleLogOut}
        login={login}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </>
  );
}
