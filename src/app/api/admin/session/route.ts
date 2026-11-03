import { NextResponse } from "next/server";
import { currentAdmin } from "@/lib/current-admin";

export async function GET() {
  const admin = await currentAdmin();
  if (!admin) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, username: admin.username });
}
