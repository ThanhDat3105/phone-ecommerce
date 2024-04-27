"use client";
import { verifyEmailAction } from "@/src/lib/redux/features/phoneSlice";
import { AppDispatch } from "@/src/lib/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

interface Props {
  params: { token: string };
}

export default function VerifyRegister(props: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const fetchVerifyEmail = () => {
    dispatch(verifyEmailAction(props.params.token));
  };

  useEffect(() => {
    notificationSuccess();
    fetchVerifyEmail();
  }, []);

  const router = useRouter();

  const notificationSuccess = () => {
    Swal.fire({
      title: "Verify done!",
      text: "Thank you for registering. Enjoy your experience!",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
      willClose: () => {
        router.push("/");
      },
    });
  };

  return <div></div>;
}
