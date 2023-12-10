import React from "react";
import MainLayout from "../../MainLayout";
import FilterLeft from "./filter_left/FilterLeft";
import FilterRight from "./filter_right/FilterRight";

export default function page() {
  return (
    <MainLayout>
      <div className="filter pt-[130px] bg-[#F5F5F5]">
        <div className="container_all">
          <div className="content flex">
            <FilterLeft />
            <FilterRight />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
