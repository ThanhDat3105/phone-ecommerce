// import { Product } from "@/interface/product";
// import { RootState } from "@/redux/store";
// import { formatPrice } from "@/utils/price";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// interface Props {
//   id: number;
// }

// export default function ItemOrder(props: Props) {
//   const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
//   const [order, setOrder] = useState<Product>();

//   const item = phoneReducer.phoneList.find(
//     (ele: Product) => ele.id_product === props.id
//   );

//   console.log(item);

//   return (
//     <div className="item flex">
//       <div className="left">
//         <div className="image">
//           <img src={order?.thumbnail} alt={order?.thumbnail} />
//         </div>
//         <div className="item_mid flex flex-col justify-between">
//           <div className="info_item flex flex-col gap-[8px]">
//             <div className="name_item text-base font-semibold overflow-hidden">
//               {order?.name}
//             </div>
//             <div className="info_detail items-center flex text-sm tracking-widest text-[#5D5D5D] gap-[20px]">
//               <p>256GB</p>
//               <p
//                 style={{ backgroundColor: `black` }}
//                 className={`max-w-[20px] max-h-[20px] w-[20px] h-[20px] rounded-full`}
//               ></p>
//             </div>
//             <div className="price_item text-xs font-semibold tracking-widest">
//               {formatPrice(Number(22000000))}đ
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="right">
//         <div className="number_price"></div>
//       </div>
//     </div>
//   );
// }
