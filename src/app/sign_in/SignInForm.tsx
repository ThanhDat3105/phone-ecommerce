"use client";
import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa6";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { LoginBodyType } from "@/src/interface/user";
import Link from "next/link";
import { toast } from "sonner";
import authApiRequest from "@/src/apiRequest/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/lib/redux/store";
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.string().min(1).max(50).email(),
  password: z.string().min(1).max(50),
});
type LoginFormValues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const dispatch = useDispatch<AppDispatch>();
  const path = Cookies.get("prevPath");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginBodyType) => {
    if (isLogin) return;

    setIsLogin(true);

    try {
      const result = await authApiRequest.login(data);

      await authApiRequest.auth({
        accessToken: result.payload.accessToken,
        refreshToken: result.payload.refreshToken,
      });

      if (result.status === 200) {
        toast.success("Login successfully!");

        if (path) {
          location.href = `/${path}`;
        } else {
          location.href = "/";
        }
      } else {
        toast.error("Invalid login information!");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLogin(false);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormControl>
                  <Input
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                    className=" rounded-[15px] h-[60px] w-full focus-visible:!shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter your password"
                      className=" rounded-[15px] h-[60px] w-full focus-visible:!shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                      {...field}
                    />
                    {showPassword ? (
                      <FaRegEyeSlash
                        onClick={() => setShowPassword(false)}
                        className="absolute right-[5%] translate-y-[-50%] top-[50%] !m-0 cursor-pointer"
                      />
                    ) : (
                      <FaRegEye
                        onClick={() => setShowPassword(true)}
                        className="absolute right-[5%] translate-y-[-50%] top-[50%] !m-0 cursor-pointer"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="forgot_password flex justify-end cursor-pointer">
          <Link
            href="/forgot-password"
            className="text-xl tracking-wider text-[#5D5D5D]"
          >
            Forgot password ?
          </Link>
        </div>
        <p className="text-lg tracking-wider text-[#5D5D5D] pt-[10px] text-center">
          Don’t have an accout yet ?
          <Link href="/sign_up" className="text-black">
            <b className="cursor-pointer ml-2">Register</b>
          </Link>
        </p>
        <Button
          className="w-full h-[60px] text-xl font-medium tracking-wider rounded-[60px] text-white bg-black border-solid border-[1px] border-black hover:opacity-95"
          type="submit"
        >
          Login
        </Button>
        <p className="text-2xl tracking-wider text-[#5D5D5D] pt-[10px] text-center">
          --- or ---
        </p>
        <div className="button_signIn flex items-center justify-center gap-[100px]">
          <FaFacebookF className="rounded-full w-[60px] h-[60px] p-[15px] border-[1px] border-solid shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] cursor-pointer" />
          <FaGoogle className="rounded-full w-[60px] h-[60px] p-[15px] border-[1px] border-solid shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] cursor-pointer" />
          <FaGithub className="rounded-full w-[60px] h-[60px] p-[15px] border-[1px] border-solid shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] cursor-pointer" />
        </div>
      </form>
    </Form>
  );
}
