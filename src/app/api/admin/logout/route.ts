import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions } from "@/lib/admin-session";

export async function POST() {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, "", { ...adminCookieOptions(), maxAge: 0 });
  return NextResponse.json({ ok: true });
}
