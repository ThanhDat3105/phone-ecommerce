import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();

  const accessToken = res.accessToken;
  const refreshToken = res.refreshToken;

  if (!accessToken && !refreshToken) {
    return Response.json({ message: "Invalid access token" }, { status: 401 });
  }

  const cookieStore = cookies();
  cookieStore.set("accessToken", accessToken);
  cookieStore.set("refreshToken", refreshToken);

  return Response.json(
    { message: "Successfully" },
    {
      status: 200,
    }
  );
}
