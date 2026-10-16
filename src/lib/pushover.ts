type PushoverResult = { ok: true } | { ok: false; error: string };

export async function sendPushover(
  title: string,
  message: string,
): Promise<PushoverResult> {
  const token = process.env.PUSHOVER_API_TOKEN?.trim();
  const user = process.env.PUSHOVER_USER_KEY?.trim();

  if (!token || !user) {
    return {
      ok: false,
      error:
        "Enquiry alerts are not configured yet. Add Pushover keys in the environment file, or reach us by email or WhatsApp.",
    };
  }

  const body = new URLSearchParams({
    token,
    user,
    title: title.slice(0, 250),
    message: message.slice(0, 1024),
    sound: "pushover",
  });

  let response: Response;
  try {
    response = await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(12000),
    });
  } catch {
    return {
      ok: false,
      error: "We could not reach the enquiry service. Please try again in a moment.",
    };
  }

  const payload = (await response.json().catch(() => null)) as
    | { status?: number }
    | null;

  if (!response.ok || payload?.status !== 1) {
    return {
      ok: false,
      error: "We could not send your enquiry just now. Please try again, or contact us directly.",
    };
  }

  return { ok: true };
}
