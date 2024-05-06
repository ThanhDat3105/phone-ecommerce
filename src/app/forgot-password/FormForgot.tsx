"use client";
import React from "react";
import { Button } from "@/src/components/ui/button";
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
import { Email } from "@/src/interface/user";
import authApiRequest from "@/src/apiRequest/auth";
import { toast } from "sonner";
import { Input } from "@/src/components/ui/input";

const formSchema = z.object({
  email: z.string().min(1).max(50).email(),
});
type ForgotFormValues = z.infer<typeof formSchema>;

export default function FormForgot() {
  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (email: Email) => {
    const result = await authApiRequest.forgotPassword(email);

    if (result) {
      toast.success("Please check your email");
    } else {
      toast.error("Invalid Information");
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
        </div>
        <Button
          className="w-full min-[768px]:h-[60px] h-[50px] !min-[768px]:mt-8 !mt-0 xl:text-xl text-lg font-medium tracking-wider rounded-[60px] text-white bg-black border-solid border-[1px] border-black hover:opacity-95"
          type="submit"
        >
          Send Email
        </Button>
      </form>
    </Form>
  );
}
