export default function Brand() {
  const brand = [
    {
      id: 1,
      name: "Apple",
    },
    {
      id: 2,
      name: "Samsung",
    },
    {
      id: 3,
      name: "Google",
    },
    {
      id: 4,
      name: "Oppo",
    },
    {
      id: 5,
      name: "Vivo",
    },
  ];

  return (
    <div className="brand pt-[50px]">
      <div className="container_all ">
        <div className="content flex justify-between max-[428px]:inline-block">
          <div className="title_brand max-[428px]:pl-2">
            <p className="xl:text-[32px] font-normal leading-10 tracking-wider text-[#000000] opacity-[50%] md:text-2xl">
              Outstanding Brand
            </p>
          </div>
          <div className="name_brand flex xl:gap-5 md:gap-[10px] sm:gap-[5px]">
            {brand.map((ele: any) => {
              return (
                <div key={ele.id} className="border-[#E5E7EB] border-[1px] border-solid py-1 px-2 flex items-center rounded-[6px] transition duration-300 hover:bg-[#D2D2D2] cursor-pointer">
                  <p
                    className="text-base font-normal tracking-wider text-[#000000] opacity-[50%]"
                    key={ele.id}
                  >
                    {ele.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
