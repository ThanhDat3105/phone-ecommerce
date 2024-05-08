import authApiRequest from "@/src/apiRequest/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");

  if (!refreshToken) {
    return Response.json({ message: "Invalid refresh token" }, { status: 401 });
  }

  try {
    const result = await authApiRequest.refreshToken({
      refreshToken: refreshToken.value,
    });

    return Response.json(result.payload, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}
