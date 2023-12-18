import React from "react";
import MainLayout from "../../MainLayout";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa6";

export default function page() {
  return (
    <MainLayout>
      <div className="sign_up pt-[140px] pb-[70px]">
        <div className="container_signIN  max-w-[630px] pb-10 mr-auto ml-auto shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] rounded-[30px]">
          <div className="content flex flex-col justify-center max-w-[460px] ml-auto mr-auto">
            <div className="title text-center pt-[25px] pb-[40px]">
              <p className="text-4xl font-bold tracking-wider">Register</p>
            </div>
            <div className="input flex flex-col gap-[40px]">
              <input
                type="text"
                placeholder="UserName"
                className="w-full border-[1px] border-solid border-[#444444] p-5 rounded-[30px] focus-visible:outline-none"
              />
              <input
                type="text"
                placeholder="Email"
                className="w-full border-[1px] border-solid border-[#444444] p-5 rounded-[30px] focus-visible:outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border-[1px] border-solid border-[#444444] p-5 rounded-[30px] focus-visible:outline-none"
              />
              <input
                type="text"
                placeholder="Password"
                className="w-full border-[1px] border-solid border-[#444444] p-5 rounded-[30px] focus-visible:outline-none"
              />
              <input
                type="text"
                placeholder="Confirm Password"
                className="w-full border-[1px] border-solid border-[#444444] p-5 rounded-[30px] focus-visible:outline-none"
              />
              <Button className="w-full h-[60px] text-2xl font-extrabold tracking-wider rounded-[60px] text-black bg-white shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] hover:text-white">
                Sign Up
              </Button>
              <p className="text-2xl tracking-wider text-[#5D5D5D] pt-[10px] text-center">
                or sign up with
              </p>
              <div className="button_signIn flex items-center justify-center gap-[100px]">
                <FaFacebookF className="rounded-full w-[40px] h-[40px] p-[5px] border-[1px] border-solid shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] cursor-pointer" />
                <FaGoogle className="rounded-full w-[40px] h-[40px] p-[5px] border-[1px] border-solid shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] cursor-pointer" />
                <FaGithub className="rounded-full w-[40px] h-[40px] p-[5px] border-[1px] border-solid shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
