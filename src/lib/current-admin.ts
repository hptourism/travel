import { cookies } from "next/headers";
import { ADMIN_COOKIE, readSessionToken } from "@/lib/admin-session";

export async function currentAdmin() {
  const jar = await cookies();
  return readSessionToken(jar.get(ADMIN_COOKIE)?.value);
}
