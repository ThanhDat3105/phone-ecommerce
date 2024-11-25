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
    <div className="brand xl:pt-[50px] pt-5">
      <div className="container_all ">
        <div className="content flex sm:flex-row flex-col gap-2 justify-between overflow-hidden">
          <div className="title_brand">
            <p className="xl:text-[32px] font-normal leading-10 tracking-wider text-[#000000] opacity-[50%] md:text-2xl">
              Outstanding Brand
            </p>
          </div>
          <div className="name_brand flex gap-3 overflow-auto">
            {brand.map((ele: any) => {
              return (
                <div
                  key={ele.id}
                  className="border-[#E5E7EB] border-[1px] border-solid py-1 px-2 flex items-center rounded-[6px] transition duration-300 hover:bg-[#D2D2D2] cursor-pointer"
                >
                  <p
                    className="xl:text-base text-xs font-normal tracking-wider text-[#000000] opacity-[50%]"
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
