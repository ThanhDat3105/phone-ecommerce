"use client";
import React from "react";
import { news } from "@/src/data/mockData";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { newsItem } from "@/src/interface/news";

interface Props {
  params: { id: number };
}

export default function NewsPage(props: Props) {
  const router = useRouter();
  const item = news.find((ele: newsItem) => {
    return ele.id === Number(props.params.id);
  });

  return (
    <>
      {item !== undefined && (
        <div className="new_detail bg-white py-[120px]">
          <div className="xl:w-[800px] min-[768px]:w-[700px] w-[380px]  mr-auto ml-auto">
            <div className="menu_back mb-[20px] flex text-[#5D5D5D] tracking-wider gap-6 ">
              <p
                onClick={() => router.push("/")}
                className="cursor-pointer transition-all duration-300 hover:text-black"
              >
                Home
              </p>
              <IoIosArrowForward className="cursor-pointer" />
              <p
                onClick={() => router.push("/news")}
                className="cursor-pointer hover:text-black transition-all duration-300"
              >
                News
              </p>
              <IoIosArrowForward className="cursor-pointer" />
              <p className="text-black cursor-pointer">Tin tức Apple</p>
            </div>
            <div className="image xl:h-[500px]">
              <Image
                src={item?.img?.src}
                alt="img"
                className="w-full h-full rounded-[20px]"
                width={800}
                height={500}
              />
            </div>
            <div className="content rounded-[20px] mt-[50px] border-[1px] border-[#D5D5D5] p-10 flex flex-col gap-[20px]">
              <div className="title text-xl font-semibold">{item?.des}</div>
              <div className="date text-[#D5D5D5]">{item?.date}</div>
              <p>
                Sáng ngày 31/10, tại sự kiện Scary Fast mới nhất, những mẫu sản
                phẩm mới Mac của Apple đã chính thức ra mắt, tạo một làn sóng
                gây chấn động cộng đồng công nghệ toàn cầu. Sự kiện ra mắt sản
                phẩm này đã thu hút sự quan tâm của đông đảo người dùng và giới
                chuyên môn. Cả thế giới đang đổ dồn con mắt vào siêu phẩm
                MacBook Pro M3 14&quot; và 16&quot; cùng iMac M3.
              </p>
              <h1 className="text-xl font-semibold">
                1. MacBook Pro M3 14 inch và MacBook Pro 16 inch
              </h1>
              <p>
                Sản phẩm MacBook Pro mới ra mắt bao gồm 2 phiên bản MacBook Pro
                M3 14 inch và MacBook Pro M3 16 inch với một số tính năng và cải
                tiến xuất sắc.
              </p>
              <p>
                Cả hai mẫu MacBook Pro này đều được trang bị chip M3 mới nhất
                của Apple, mang đến hiệu năng mạnh mẽ và khả năng tiết kiệm năng
                lượng vượt trội.
              </p>
              <h1 className="text-xl font-semibold">Thiết kế</h1>
              <p>
                Thiết kế mới sang trọng. với vỏ nhôm nguyên khối, với các góc
                cạnh được bo tròn. Máy có hai màu sắc chính là bạc và xám than.
              </p>
              <h1 className="text-xl font-semibold">Màu sắc</h1>
              <p>Máy có hai màu sắc chính là bạc và xám than cực cáng trọng</p>
              <h1 className="text-xl font-semibold">Thông số kỹ thuật</h1>
              <h1 className="text-xl font-semibold">Màn Hình</h1>
              <p>
                MacBook Pro M3 có hai kích thước màn hình là 14 inch và 16 inch.
                Cả hai kích thước màn hình đều sử dụng tấm nền Liquid Retina
                XDR, với độ phân giải 3024 x 1964 pixel và tần số quét 120Hz.
                Màn hình Liquid Retina XDR tối ưu những vùng sáng, kể cả hình
                ảnh vùng tối vẫn chi tiết, sắc nét, độ tương phản cao và màu sắc
                chính xác.
              </p>
              <p>
                Đặc biệt, với tần số quét 120Hz hình ảnh hiển thị mượt mà và
                trơn tru hơn. Đặc biệt mãn nhãn khi chơi trò chơi điện tử đồ họa
                đẹp mắt, hay và xem video chất lượng.
              </p>
              <h1 className="text-xl font-semibold">Chip</h1>
              <p>
                Chip M3, M3 Pro và M3 Max đều là con chip mới nhất của Apple,
                được sản xuất trên tiến trình 3nm. Chip M3 là dòng chip tiên
                tiến nhất từng được thiết kế cho máy tính cá nhân, hơn hết, hiệu
                năng CPU và GPU mạnh mẽ hơn so với chip M2.
              </p>
              <h1 className="text-xl font-semibold">Pin</h1>
              <p>
                Thời gian xem video lên đến 22 giờ và thời gian duyệt web trên
                mạng không dây lên đến 15 giờ.
              </p>
              <h1 className="text-xl font-semibold">Camera & loa</h1>
              <p>
                Camera FaceTime HD 1080p, với cảm biến lớn và khẩu độ lớn hơn,
                giúp cải thiện chất lượng hình ảnh trong điều kiện ánh sáng yếu.
                Tnh năng Center Stage, giúp giữ cho người dùng luôn ở trung tâm
                khung hình khi họ di chuyển. Song song hệ thống loa 6 loa, với
                âm thanh nổi Dolby Atmos truyền tải âm thanh sống động và mạnh
                mẽ,
              </p>
              <h1 className="text-xl font-semibold">Bàn phím và Touch Bar</h1>
              <p>
                Bàn phím được thiết kế với các phím bấm có độ nảy tốt và độ
                chính xác cao. Touch Bar nhạy, gần như không có độ trễ, dễ dàng
                thao tác điều khiển máy.
              </p>
              <h1 className="text-xl font-semibold">Cổng kết nối</h1>
              <p>
                MacBook Pro M3 có ba cổng Thunderbolt 4, một cổng HDMI và một
                cổng MagSafe 3.
              </p>
              <h1 className="text-xl font-semibold">Một số tính năng khác</h1>
              <h1 className="text-xl font-semibold">
                Công nghệ dò tia tốc độ cao bằng phần cứng
              </h1>
              <p>
                MacBook Pro giờ đây được trang bị công nghệ dò tia tốc độ cao
                bằng phần cứng, mang đến hiệu năng kết xuất nhanh hơn đến 2,5
                giờ và giúp các ứng dụng chuyên nghiệp và trò chơi hiển thị chân
                thực hơn bao giờ hết.
              </p>
              <h1 className="text-xl font-semibold">Cảm biến Touch ID</h1>
              <p>
                Touch ID bảo vệ dữ liệu và thông tin cá nhân của người dùng, cực
                kỳ an toàn và tiện lợi, chỉ cần chạm ngón tay mà không phải nhớ
                mật khẩu.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
