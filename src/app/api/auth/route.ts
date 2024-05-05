export async function POST(request: Request) {
  const res = await request.json();

  const sessionToken = res.content?.accessToken;

  if (!sessionToken) {
    return Response.json({ message: "Invalid session token" }, { status: 400 });
  }

  return Response.json(res.content, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly`,
    },
  });
}
