"use client";
import React, { useEffect } from "react";
import MainLayout from "../../MainLayout";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
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
import {
  forgotPasswordUser,
  setCloseLoading,
} from "@/redux/features/phoneSlice";
import Loading from "@/components/loading/Loading";

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

  useEffect(() => {
    dispatch(setCloseLoading(false));
  }, []);

  return (
    <MainLayout>
      {phoneReducer.isLoading && <Loading />}
      {phoneReducer.isLoading ? (
        <div className="min-h-[600px]"></div>
      ) : (
        <div className="forgot_password xl:pt-[140px] xl:pb-[70px] pb-[50px] bg-white">
          <div className="container_forgot-password flex justify-center max-[428px]:max-w-[330px] max-w-[630px] xl:pb-10 pb-0 mr-auto ml-auto xl:shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] rounded-[30px] h-screen">
            <div className="content xl:py-10 py-16 flex flex-col justify-center max-w-[460px] ml-auto mr-auto">
              <div className="title text-center pt-[25px]">
                <p className="min-[768px]:text-3xl text-2xl font-bold tracking-wider">
                  Forgot Password
                </p>
              </div>
              <p className="min-[768px]:py-10 py-5 min-[768px]:text-xl text-base tracking-wider text-muted-foreground">
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
                    className="w-full min-[768px]:h-[60px] h-[50px] !min-[768px]:mt-8 !mt-0 xl:text-xl text-lg font-medium tracking-wider rounded-[60px] text-white bg-black border-solid border-[1px] border-black hover:opacity-95"
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
