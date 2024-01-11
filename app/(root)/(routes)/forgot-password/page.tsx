"use client";
import React, { useEffect } from "react";
import MainLayout from "../../MainLayout";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Email } from "@/interface/user";
import { forgotPasswordUser } from "@/redux/features/phoneSlice";
import Loading from "@/app/components/loading/Loading";

const formSchema = z.object({
  email: z.string().min(1).max(50).email(),
});
type ForgotFormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  const dispatch = useDispatch<AppDispatch>();
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: Email) => {
    dispatch(forgotPasswordUser(data));
  };

  return (
    <MainLayout>
      {phoneReducer.isLoading && <Loading />}
      {phoneReducer.isLoading ? (
        <div className="min-h-[600px]"></div>
      ) : (
        <div className="sign_in pt-[140px] pb-[70px] bg-white">
          <div className="container_signIN  max-w-[630px] pb-10 mr-auto ml-auto shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] rounded-[30px]">
            <div className="content py-10 flex flex-col justify-center max-w-[460px] ml-auto mr-auto">
              <div className="title text-center pt-[25px]">
                <p className="text-3xl font-bold tracking-wider">
                  Forgot Password
                </p>
              </div>
              <p className="py-[40px] text-xl tracking-wider">
                Lost your password? Please enter your or email address. We will
                redirect you to the new password creation page
              </p>
              <Form {...form}>
                <form
                  className="space-y-8 w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
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
                  </div>
                  <Button
                    className="w-full h-[60px] text-xl font-medium tracking-wider rounded-[60px] text-white bg-black border-solid border-[1px] border-black hover:opacity-95"
                    type="submit"
                  >
                    Send Email
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
