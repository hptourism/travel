import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, createSessionToken } from "@/lib/admin-session";
import { collection } from "@/lib/mongo";
import { hashPassword, verifyPassword } from "@/lib/password";

type AdminDocument = {
  username: string;
  passwordHash: string;
};

const dummyHash = hashPassword("unused-admin-timing-pad");

export async function POST(request: Request) {
  let body: { username?: unknown; password?: unknown };
  try {
    body = (await request.json()) as { username?: unknown; password?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "Enter your login id and password." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json({ ok: false, error: "Enter your login id and password." }, { status: 400 });
  }

  try {
    const admins = await collection<AdminDocument>("admins");
    const admin = await admins.findOne({ username });
    const valid = verifyPassword(password, admin?.passwordHash || dummyHash);
    if (!admin || !valid) {
      return NextResponse.json(
        { ok: false, error: "Incorrect login id or password." },
        { status: 401 },
      );
    }

    const jar = await cookies();
    jar.set(ADMIN_COOKIE, createSessionToken(admin.username), adminCookieOptions());
    return NextResponse.json({ ok: true, username: admin.username });
  } catch (error) {
    console.error("Admin sign-in failed.", error);
    return NextResponse.json(
      { ok: false, error: "Sign-in is unavailable right now. Try again in a moment." },
      { status: 503 },
    );
  }
}
