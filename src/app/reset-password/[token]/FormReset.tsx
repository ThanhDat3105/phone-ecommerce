"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
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
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Password } from "@/src/interface/user";
import { toast } from "sonner";
import authApiRequest from "@/src/apiRequest/auth";

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

interface Props {
  token: string;
}

export default function FormReset(props: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: Password) => {
    try {
      if (data.password === data.confirmPassword) {
        const result = await authApiRequest.resetPassword(
          data.password,
          props.token
        );

        if (result) {
          toast.success("Reset successfully");
        }
      } else {
        toast.error("Passwords do not match.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
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
  );
}
