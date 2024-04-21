"use client";
import React from "react";
import MainLayout from "../../MainLayout";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa6";
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
import { UserSignIn } from "@/interface/user";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { registerUser } from "@/redux/features/phoneSlice";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(1).max(50).email(),
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
  birthday: z.any(),
  address: z.string().min(2),
  phone: z.string().min(10).max(11),
});
type registerFormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<registerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthday: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = async (d: UserSignIn) => {
    const data = {
      ...d,
      birthday: d.birthday
        ? format(new Date(d.birthday), "yyyy-MM-dd")
        : undefined,
    };
    try {
      await dispatch(registerUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="sign_up pt-[140px] pb-[70px] bg-white">
        <div className="container_signIN  max-w-[630px] pb-10 mr-auto ml-auto shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] rounded-[30px]">
          <div className="content py-10 flex flex-col justify-center max-w-[460px] ml-auto mr-auto">
            <div className="title text-center pt-[25px] pb-[40px]">
              <p className="text-3xl font-bold tracking-wider">Register</p>
            </div>
            <Form {...form}>
              <form
                className="space-y-4 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="input flex flex-col gap-[30px]">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="User name"
                            {...field}
                            className=" rounded-[15px] h-[60px] w-full focus-visible:!shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="User email"
                            {...field}
                            className=" rounded-[15px] h-[60px] w-full focus-visible:!shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
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
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                            className=" rounded-[15px] h-[60px] w-full focus-visible:!shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="end">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="User Address"
                            {...field}
                            className=" rounded-[15px] h-[60px] w-full focus-visible:!shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="User Phone"
                            {...field}
                            className=" rounded-[15px] h-[60px] w-full focus-visible:!shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-lg tracking-wider text-[#5D5D5D] pt-[10px] text-center">
                    Already have account ?
                    <Link href="/sign_in" className="text-black">
                      <b className="cursor-pointer ml-2">Sign In</b>
                    </Link>
                  </p>
                  <Button className="w-full h-[60px] text-xl font-extrabold tracking-wider rounded-[60px] text-black bg-white shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] hover:text-white">
                    Sign Up
                  </Button>
                  <p className="text-2xl tracking-wider text-[#5D5D5D] pt-[10px] text-center">
                    --- or ---
                  </p>
                  <div className="button_signIn flex items-center justify-center gap-[100px]">
                    <FaFacebookF className="rounded-full w-[60px] h-[60px] p-[15px] border-[1px] border-solid shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] cursor-pointer" />
                    <FaGoogle className="rounded-full w-[60px] h-[60px] p-[15px] border-[1px] border-solid shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] cursor-pointer" />
                    <FaGithub className="rounded-full w-[60px] h-[60px] p-[15px] border-[1px] border-solid shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] cursor-pointer" />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
