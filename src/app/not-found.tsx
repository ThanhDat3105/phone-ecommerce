import notFound from "@/public/not_found.png";

import { Button } from "@/src/components/ui/button";
import MainLayout from "./(root)/MainLayout";
import Link from "next/link";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="not_found h-screen pt-[140px]">
        <div className="container_all">
          <div className="content max-w-[620px] ml-auto mr-auto flex flex-col items-center gap-[40px]">
            <div className="image">
              <img src={notFound.src} alt="not_found" />
            </div>
            <div className="text flex flex-col gap-[10px]">
              <p className="text-xl text-center">
                The page you are looking for doesn&apos;t exist or an other
                error eccurred
              </p>
              <p className="text-xl text-[#AAAAAA] text-center">
                To back or head over to k.vn to choose a new direction
              </p>
            </div>
            <Button className="button_back px-[35px] py-[15px] border-none rounded-[6px] bg-black transition-all duration-300">
              <Link className="text-white" href="/">Go To Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
