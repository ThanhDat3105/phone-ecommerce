"use client";
import authApiRequest from "@/src/apiRequest/auth";
import { ProductItem } from "@/src/interface/product";
import { LoginRegisResType, UserProfile } from "@/src/interface/user";
import { useEffect, useState } from "react";

export default async function page() {
  const [user, setUser] = useState<LoginRegisResType>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLocal = localStorage.getItem("USER_INFO_KEY");
      if (userLocal) {
        setUser(JSON.parse(userLocal));
      }
    }
  }, []);

  const result = await authApiRequest.fetchProfile({
    sessionToken: String(user?.accessToken),
  });

  console.log(result);

  const data: UserProfile = result?.payload;
  return (
    <>
      {/* {data && (
        <div className="pt-[70px]">
          <p>{data.name}</p>
          <p>{data.phone}</p>
          <p>{data.birthday}</p>
          <p>{data.address}</p>
          <p>{data.email}</p>

          {data.productItem.map((item: any) => {
            return (
              <div key={item.name}>
                {item.productItem.map((item: ProductItem) => {
                  return <div key={item.name}>{item.name}</div>;
                })}
              </div>
            );
          })}
        </div>
      )} */}
    </>
  );
}
