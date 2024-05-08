import authApiRequest from "@/src/apiRequest/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  const force = res.force as boolean | undefined;

  if (force) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return Response.json(
      {
        message: "Buộc đăng xuất thành công",
      },
      {
        status: 200,
      }
    );
  }

  if (!accessToken) {
    return Response.json({ message: "Invalid access token" }, { status: 401 });
  }

  try {
    await authApiRequest.logoutApi({
      accessToken: accessToken.value,
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return Response.json(
      { message: "Successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
