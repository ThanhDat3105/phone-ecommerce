"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface Props {
  handleLogOut: () => void;
  setShowMenu: (value: boolean) => void;
  pathName: string;
  login: boolean;
  showMenu: boolean;
}

export default function ModalMenu(props: Props) {
  const router = useRouter();
  return (
    <div
      className={`modal_menu transition-all duration-500 absolute w-full md:mt-[70px] mt-[60px] pt-[30px] h-screen z-50 bg-white md:hidden ${
        props.showMenu ? "translate-x-0" : "translate-x-[-1000px]"
      }`}
    >
      <div className="container_all">
        <div className="header_menu flex flex-col gap-[20px] text-black mb-[20px]">
          <div className="item_menu category flex cursor-pointer relative items-center">
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
          <div className="item_menu relative">
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
        <div className="header_info flex flex-col gap-[20px]">
          <div className="header_user relative">
            {!props.login ? (
              <>
                <div
                  className="cursor-pointer font-normal text-base bg-white text-black hover:opacity-80 transition-all duration-300 mb-[20px]"
                  onClick={() => {
                    router.push("/sign_in");
                  }}
                >
                  Login
                </div>
                <div
                  className="bg-white text-black font-normal text-base cursor-pointer hover:opacity-80 transition-all duration-300"
                  onClick={() => {
                    router.push("/sign_up");
                  }}
                >
                  Register
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex items-center font-normal text-base justify-between cursor-pointer bg-white text-black hover:opacity-80 transition-all duration-300 mb-[20px]"
                  onClick={() => router.push("/order-list")}
                >
                  Order list
                </div>
                <div
                  className="flex items-center font-normal text-base gap-5 cursor-pointer bg-white text-black hover:opacity-80 transition-all duration-300"
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
    </div>
  );
}
