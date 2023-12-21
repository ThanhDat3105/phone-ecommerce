import React from "react";

export default function OrderLeft() {
  return (
    <div className="order_left absolute w-[15%] bg-white shadow-[0_5px_10px_0_rgba(0,0,0,0.1)] rounded-[10px]">
      <div className="content">
        <div className="profile">
          <p className="cursor-pointer hover:bg-black hover:text-white transition-all duration-300 py-5 px-5 rounded-t-[10px]">
            Profile
          </p>
        </div>
        <div className="order_list ">
          <p className="cursor-pointer hover:bg-black hover:text-white transition-all duration-300 py-5 px-5 rounded-b-[10px]">
            Order list
          </p>
        </div>
      </div>
    </div>
  );
}
