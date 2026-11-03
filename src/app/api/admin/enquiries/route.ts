import { NextResponse } from "next/server";
import { currentAdmin } from "@/lib/current-admin";
import { listEnquiries } from "@/lib/enquiries";

export async function GET() {
  const admin = await currentAdmin();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  try {
    const enquiries = await listEnquiries();
    return NextResponse.json({ ok: true, enquiries });
  } catch (error) {
    console.error("Enquiry list failed.", error);
    return NextResponse.json(
      { ok: false, error: "Enquiries could not be loaded." },
      { status: 503 },
    );
  }
}
