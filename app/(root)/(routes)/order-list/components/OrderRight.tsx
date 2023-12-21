// import React from "react";
// import ItemOrder from "./ItemOrder";
// import { OrderItem, OrderList } from "@/interface/order";
// import { User } from "@/interface/user";

// interface Props {
//   orderList: OrderList[];
//   user: User | undefined;
// }

// export default function OrderRight(props: Props) {
//   console.log(props.orderList);
//   return (
//     <div className="order_right w-[85%] bg-white shadow-[0_5px_10px_0_rgba(0,0,0,0.1)] rounded-[10px]">
//       <div className="item_all">
//         {props.orderList
//           .filter((ele: OrderList) => ele.id_user === props.user?.id_user)
//           .map((ele: OrderList) =>
//             ele.OrderItem.map((ele: OrderItem) => (
//               <ItemOrder key={ele.id_orderItem} id={ele.id_orderItem} />
//             ))
//           )}
//       </div>
//     </div>
//   );
// }
