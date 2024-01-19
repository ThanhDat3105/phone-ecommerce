"use client";
import React, { useState } from "react";
import MainLayout from "@/app/(root)/MainLayout";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Password } from "@/interface/user";
import { toast } from "sonner";
import { resetPasswordUser } from "@/redux/features/phoneSlice";

interface Props {
  params: { token: string };
}

const formSchema = z.object({
  password: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => {
        return /[A-Z]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value);
      },
      {
        message:
          "The password must contain at least one uppercase letter and at least one special character.",
      }
    ),
  confirmPassword: z.string().min(1).max(50),
});
type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: Password) => {
    try {
      if (data.password === data.confirmPassword) {
        dispatch(
          resetPasswordUser({
            password: data.password,
            token: props.params.token,
          })
        );
      } else {
        toast.error("Passwords do not match.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="sign_in pt-[140px] pb-[70px]">
        <div className="container_signIN  max-w-[630px] pb-10 mr-auto ml-auto shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] rounded-[30px]">
          <div className="content py-10 flex flex-col justify-center max-w-[460px] ml-auto mr-auto">
            <div className="title text-center pt-[25px] pb-[40px]">
              <p className="text-3xl font-bold tracking-wider">
                Reset Password
              </p>
              <p className="pt-[20px] text-xl tracking-wider">
                Please create a new password
              </p>
            </div>
            <Form {...form}>
              <form
                className="space-y-8 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-col justify-center">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mb-5">
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              placeholder="Password"
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
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className=" rounded-[15px] h-[60px] w-full focus-visible:!shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-full h-[60px] text-xl font-medium tracking-wider rounded-[60px] text-white bg-black border-solid border-[1px] border-black hover:opacity-95"
                  type="submit"
                >
                  Reset Password
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
