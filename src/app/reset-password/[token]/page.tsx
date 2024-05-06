import FormReset from "./FormReset";

interface Props {
  params: { token: string };
}
export default function LoginPage(props: Props) {
  return (
    <div className="sign_in pt-[140px] pb-[70px]">
      <div className="container_signIN  max-w-[630px] pb-10 mr-auto ml-auto shadow-[0_5px_10px_0_rgb(0,0,0,0.2)] rounded-[30px]">
        <div className="content py-10 flex flex-col justify-center max-w-[460px] ml-auto mr-auto">
          <div className="title text-center pt-[25px] pb-[40px]">
            <p className="text-3xl font-bold tracking-wider">Reset Password</p>
            <p className="pt-[20px] text-xl tracking-wider">
              Please create a new password
            </p>
            <FormReset token={props.params.token} />
          </div>
        </div>
      </div>
    </div>
  );
}
