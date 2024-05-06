import apple from "@/public/image/product/apple-removebg-preview 1.png";
import samsung from "@/public/image/product/logosamsung-removebg-preview 1.png";
import xiaomi from "@/public/image/product/logoxiaomi 1.png";
import vivo from "@/public/image/product/logo vivo 1.png";
import realme from "@/public/image/product/logo realme 1.png";
import oppo from "@/public/image/product/logooppo 1.png";
import nokia from "@/public/image/product/logonokia 2.png";

import new1 from "@/public/image/news/new1.png";
import new2 from "@/public/image/news/new2.png";
import new3 from "@/public/image/news/new3.png";

import apple1 from "@/public/image/news/apple1.png";
import apple2 from "@/public/image/news/apple2.png";
import apple3 from "@/public/image/news/apple3.png";
import apple4 from "@/public/image/news/apple4.png";

import review1 from "@/public/image/news/review1.png";
import review2 from "@/public/image/news/review2.png";
import review3 from "@/public/image/news/review3.png";
import review4 from "@/public/image/news/review4.png";

import discover1 from "@/public/image/news/discover1.png";
import discover2 from "@/public/image/news/discover2.png";
import discover3 from "@/public/image/news/discover3.png";
import discover4 from "@/public/image/news/discover4.png";

import other1 from "@/public/image/news/other1.png";
import other2 from "@/public/image/news/other2.png";
import other3 from "@/public/image/news/other3.png";
import other4 from "@/public/image/news/other4.png";

const companyPhone = [
  {
    id: 1,
    image: apple,
  },
  {
    id: 2,
    image: samsung,
  },
  {
    id: 3,
    image: xiaomi,
  },
  {
    id: 4,
    image: vivo,
  },
  {
    id: 5,
    image: realme,
  },
  {
    id: 6,
    image: oppo,
  },
  {
    id: 7,
    image: nokia,
  },
];

const news = [
  {
    id: 1,
    type: "",
    img: new1,
    des: "Tiêu điểm cuối năm 2023: Tổng hợp sản phẩm MacBook và iMac mới nhất của Apple",
    date: "10/10/2023",
  },
  {
    id: 2,
    type: "",
    img: new2,
    des: "Thông số MacBook Air M2 15 inch 2023 có gì mới? Có đáng để “xuống tiền?",
    date: "10/10/2023",
  },

  {
    id: 3,
    type: "",
    img: new3,
    des: "iPad đang dần thay thế Macbook như thế nào?",
    date: "10/10/2023",
  },
  {
    id: 4,
    type: "apple",
    img: apple1,
    des: "iPhone 15 Plus màu Hồng - Dịu dàng, cuốn hút và rất đặc biệt!",
    date: "24/10/2023",
  },
  {
    id: 5,
    type: "apple",
    img: apple2,
    des: "Dung Lượng Pin iPhone 15 Pro Max khủng 4.422 mAh| Test thực tế ra sao?",
    date: "30/10/2023",
  },
  {
    id: 6,
    type: "apple",
    img: apple3,
    des: "iPhone 15 Pro Có Mấy Màu? Màu Nào Mới Và Đẹp Nhất?",
    date: "30/10/2023",
  },
  {
    id: 7,
    type: "apple",
    img: apple4,
    des: "Cấu hình iPhone 15 Pro Max đột phá chưa từng thấy!",
    date: "30/10/2023",
  },
  {
    id: 8,
    type: "review",
    img: review1,
    des: "Đánh giá MacBook Air M1: MacBook Air M1 có ổn không? Dùng được ... mấy năm nữa?",
    date: "31/08/2023",
  },
  {
    id: 9,
    type: "review",
    img: review2,
    des: "Review MacBook Pro 16 inch M2 Max - MacBook “xịn nhất” của Apple ...như thế nào?",
    date: "10/10/2023",
  },
  {
    id: 10,
    type: "review",
    img: review3,
    des: "[Review] Có nên mua iPad vẽ đồ họa? 5+ gợi ý tốt nhất 2023",
    date: "07/07/2023",
  },
  {
    id: 11,
    type: "review",
    img: review4,
    des: "So sánh MacBook Pro M1 Pro vs M2 Pro: Liệu M2 Pro có vượt trội hơn ...M1 Pro?",
    date: "15/06/2023",
  },
  {
    id: 12,
    type: "discover",
    img: discover1,
    des: "Mẹo tải ứng dụng SEED dù không phải là nhân viên Apple",
    date: "16/10/2023",
  },
  {
    id: 13,
    type: "discover",
    img: discover2,
    des: "Đánh giá sức mạnh của chip A17 Pro: Vượt xa A16 Bionic",
    date: "18/09/2023",
  },
  {
    id: 14,
    type: "discover",
    img: discover3,
    des: "So sánh MacBook Pro 13 M2 vs MacBook Pro 16 M1 Max: “Cuộc chiến”... không cân sức!",
    date: "10/10/2023",
  },
  {
    id: 15,
    type: "discover",
    img: discover4,
    des: "Chất Liệu Titan Trên iPhone 15 Pro Và Pro Max",
    date: "18/09/2023",
  },
  {
    id: 16,
    type: "other",
    img: other1,
    des: "Ai nên mua MacBook Pro M3 với cải tiến chính về GPU? - Tư vấn chi tiết",
    date: "10/11/2023",
  },
  {
    id: 17,
    type: "other",
    img: other2,
    des: "Trả góp MacBook Pro M3 - Sở hữu MacBook chip M3 đơn giản với ... ShopDunk",
    date: "10/11/2023",
  },
  {
    id: 18,
    type: "other",
    img: other3,
    des: "Sạc MacBook Pro M3 bao nhiêu W? Máy hỗ trợ tính năng sạc nhanh ... nào?",
    date: "08/11/2023",
  },
  {
    id: 19,
    type: "other",
    img: other4,
    des: "Review MacBook Pro M3 2023: Chip M3 series vượt trội, tối ưu đồ họa và ... gaming",
    date: "08/11/2023",
  },
];

const frameworks = [
  {
    value: "popular",
    label: "Popular",
  },
  {
    value: "lowtohigh",
    label: "Price low to high",
  },
  {
    value: "hightolow",
    label: "Price high to low",
  },
];

export { companyPhone, news, frameworks };
