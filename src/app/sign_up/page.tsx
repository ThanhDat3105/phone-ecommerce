import SignUpForm from "./SignUpForm";

export default function RegisterPage() {
  return (
    <div className="sign_up pt-[140px] pb-[70px] bg-white">
      <div className="container_signIN  max-w-[630px] pb-10 mr-auto ml-auto shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] rounded-[30px]">
        <div className="content py-10 flex flex-col justify-center max-w-[460px] ml-auto mr-auto">
          <div className="title text-center pt-[25px] pb-[40px]">
            <p className="text-3xl font-bold tracking-wider">Register</p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
