"use client";
import authApiRequest from "@/src/apiRequest/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

interface Props {
  params: { token: string };
}

export default function VerifyRegister(props: Props) {
  const fetchVerifyEmail = async () => {
    await authApiRequest.verifyEmail(props.params.token);
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
        router.push("/sign_in");
      },
    });
  };

  return <div></div>;
}
