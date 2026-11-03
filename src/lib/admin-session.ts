import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "hp_admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 12;

type SessionPayload = {
  username: string;
  exp: number;
};

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set.");
  }
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function createSessionToken(username: string) {
  const body: SessionPayload = {
    username,
    exp: Date.now() + ADMIN_COOKIE_MAX_AGE * 1000,
  };
  const payload = Buffer.from(JSON.stringify(body)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(token: string | undefined | null) {
  if (!token || !process.env.ADMIN_SESSION_SECRET?.trim()) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(actualBuffer, expectedBuffer)) return null;

  try {
    const body = JSON.parse(Buffer.from(payload, "base64url").toString()) as Partial<SessionPayload>;
    if (!body.username || typeof body.exp !== "number" || body.exp < Date.now()) return null;
    return { username: body.username };
  } catch {
    return null;
  }
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  };
}
