import React from "react";

import "./loading.scss";

export default function Loading() {
  return (
    <div
      className="fixed z-[999] top-0 bottom-0 right-0 left-0 w-screen h-screen"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="loading z-[9999] absolute top-[50%] left-[50%]">
        <div className="loader">
          <div className="circle !bg-white" />
          <div className="circle !bg-white" />
          <div className="circle" />
          <div className="circle" />
        </div>
      </div>
    </div>
  );
}
