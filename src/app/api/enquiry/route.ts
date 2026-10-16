import { NextResponse } from "next/server";
import { sendPushover } from "@/lib/pushover";

const startingPoints = new Set(["Delhi", "Chandigarh", "Other"]);

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[^\S\n]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, max);
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 20000) {
    return NextResponse.json(
      { ok: false, error: "That enquiry is too long." },
      { status: 413 },
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") throw new Error("invalid");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid enquiry." },
      { status: 400 },
    );
  }

  if (clean(body.company, 80)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 20);
  const email = clean(body.email, 120);
  const startingFrom = clean(body.startingFrom, 40);
  const packageName = clean(body.packageName, 120);
  const travellers = clean(body.travellers, 60);
  const dates = clean(body.dates, 80);
  const details = clean(body.details, 800);
  const phoneDigits = digits(phone);

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 },
    );
  }
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid phone number." },
      { status: 400 },
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (!startingPoints.has(startingFrom)) {
    return NextResponse.json(
      { ok: false, error: "Please choose where the trip starts." },
      { status: 400 },
    );
  }
  if (!packageName) {
    return NextResponse.json(
      { ok: false, error: "Please choose a package." },
      { status: 400 },
    );
  }
  if (details.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Please add a few trip details." },
      { status: 400 },
    );
  }

  const when = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const lines = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    `Starting from: ${startingFrom}`,
    `Package: ${packageName}`,
    travellers ? `Travellers: ${travellers}` : null,
    dates ? `Dates: ${dates}` : null,
    `Details: ${details}`,
    `Received: ${when}`,
  ].filter(Boolean);

  const result = await sendPushover(
    `Himachal enquiry — ${name}`.slice(0, 250),
    lines.join("\n"),
  );

  if (!result.ok) {
    return NextResponse.json(result, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
