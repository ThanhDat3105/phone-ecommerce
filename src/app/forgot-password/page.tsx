import FormForgot from "./FormForgot";

export default function ForgotPasswordPage() {
  return (
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
          <FormForgot />
        </div>
      </div>
    </div>
  );
}
