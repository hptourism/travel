"use client";

import { FormEvent, useState } from "react";
import { buttonClass } from "@/lib/styles";

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-base text-ink outline-none ring-forest/30 placeholder:text-muted/70 focus:ring-2";

type AdminLoginProps = {
  onSuccess: (username: string) => void;
};

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; username?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        setError(payload?.error || "Incorrect login id or password.");
        setPending(false);
        return;
      }

      onSuccess(payload.username || username.trim());
    } catch {
      setError("Network error. Please try again.");
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl border border-line bg-paper p-6 shadow-[0_20px_60px_rgba(0,20,12,0.08)] sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">Private</p>
        <h1 className="mt-2 font-serif text-3xl text-pine">Admin</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Sign in to view enquiry submissions.
        </p>

        <label className="mt-6 block text-sm">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
            Login id
          </span>
          <input
            name="username"
            autoComplete="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="mt-4 block text-sm">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
            Password
          </span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={fieldClass}
          />
        </label>

        {error ? (
          <p className="mt-4 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" disabled={pending} className={buttonClass("primary", "mt-6 w-full")}>
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
