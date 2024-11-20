import logo from "@/public/image/header/logo.png";

import {
  FaApple,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoArrowForward } from "react-icons/io5";

import "./footer.scss";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="footer bg-black text-white">
      <div className="container_all">
        <div className="content">
          <div className="content_top pt-[35px] pb-10 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-0 gap-14">
            <div className="left max-w-[160px]">
              <div className="logo flex gap-[12px] ">
                <div className="image">
                  <Image
                    src={logo.src}
                    alt="logo"
                    className="text-3xl max-w-none relative top-[50%] translate-y-[-50%]"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="separate relative w-[1px] bg-white"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="icon">
                    <FaApple className="text-[40px]" />
                  </div>
                  <p className="text-xl tracking-wider">Premium Reseller</p>
                </div>
              </div>
              <div className="icon_contact flex justify-between pt-6">
                <div className="item_icon">
                  <FaFacebookF className="icon" />
                </div>
                <div className="item_icon">
                  <FaYoutube className="icon" />
                </div>
                <div className="item_icon">
                  <FaInstagram className="icon" />
                </div>
                <div className="item_icon">
                  <FaTwitter className="icon" />
                </div>
              </div>
            </div>
            <div className="middle xl:gap-[60px] gap-[60px] xl:flex-row flex">
              <div className="middle_item">
                <h5>Support</h5>
                <ul className="text-sm flex flex-col gap-[15px] text-[#d9d7d7d2] pt-[10px]">
                  <li className="cursor-pointer">Contact us</li>
                  <li className="cursor-pointer">FAQ</li>
                  <li className="cursor-pointer">Warranty service</li>
                  <li className="cursor-pointer">Return policy</li>
                </ul>
              </div>
              <div className="middle_item">
                <h5>Information</h5>
                <ul className="text-sm flex flex-col gap-[15px] text-[#d9d7d7d2] pt-[10px]">
                  <li className="cursor-pointer">About us</li>
                  <li className="cursor-pointer">News</li>
                  <li className="cursor-pointer">Payment methods</li>
                  <li className="cursor-pointer">Evaluate quality</li>
                </ul>
              </div>
            </div>
            <div className="right flex flex-col gap-[30px]">
              <div className="title flex items-center gap-[20px]">
                <HiOutlineMail className="text-2xl" />
                <p className="text-xl">Stay up date on the latest from K15</p>
              </div>
              <div className="input_email relative">
                <input
                  type="email"
                  className="text-black w-full py-4 pl-[25px] rounded-[50px] tracking-wider focus-visible:outline-none"
                  placeholder="Enter your e-mail address "
                ></input>
                <Button className="icon_arrow absolute right-[2%] top-[50%] translate-y-[-50%] bg-[#AAAAAA] rounded-[50%] p-0">
                  <IoArrowForward className="text-[40px]" />
                </Button>
              </div>
            </div>
          </div>
          <div className="separate h-[1px] bg-white" />
          <div className="content_bottom pt-5 pb-6 max-w-[600px]">
            <p className="text-[#646464] text-xs font-semibold tracking-wider">
              © 2016 Công ty Cổ Phần HESMAN Việt Nam GPDKKD: 0107465657 do Sở KH
              & ĐT TP. Hà Nội cấp ngày 08/06/2016.Địa chỉ: Số 76 Thái Hà, phường
              Trung Liệt, quận Đống Đa, thành phố Hà Nội, Việt NamĐại diện pháp
              luật: PHẠM MẠNH HÒA | ĐT: 0247.305.9999 | Email:
              lienhe@shopdunk.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
