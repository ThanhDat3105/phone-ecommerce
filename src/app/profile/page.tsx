import { ProductItem } from "@/src/interface/product";
import { UserProfile } from "@/src/interface/user";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await fetch(
    "https://store-phone-server.vercel.app/auth/profile",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = {
      status: res.status,
      content: payload.content,
    };

    if (!res.ok) {
      throw data;
    }

    return data;
  });

  const data: UserProfile = result?.content;

  return (
    <>
      {data && (
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
      )}
    </>
  );
}
