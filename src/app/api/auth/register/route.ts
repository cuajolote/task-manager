import { NextRequest, NextResponse } from "next/server";
import { delay, users, generateId, createToken, toSafeUser } from "../../_db";
import type { RegisterInput } from "@/lib/types";

export async function POST(request: NextRequest) {
  await delay();

  const { name, email, password }: RegisterInput = await request.json();

  if (users.find((u) => u.email === email)) {
    return NextResponse.json(
      { error: { message: "Email already registered" } },
      { status: 409 }
    );
  }

  const newUser = { id: generateId.user(), name, email, password };
  users.push(newUser);

  const token = createToken(newUser.id, newUser.email);

  const response = NextResponse.json(
    { data: { user: toSafeUser(newUser), token } },
    { status: 201 }
  );

  response.cookies.set("auth-token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
