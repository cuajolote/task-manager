import { NextRequest, NextResponse } from "next/server";
import { delay, users, createToken, toSafeUser } from "../../_db";

export async function POST(request: NextRequest) {
  await delay();

  const { email, password } = await request.json();
  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return NextResponse.json(
      { error: { message: "Invalid email or password" } },
      { status: 401 }
    );
  }

  const token = createToken(user.id, user.email);

  const response = NextResponse.json({
    data: { user: toSafeUser(user), token },
  });

  response.cookies.set("auth-token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
