"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminInbox } from "@/components/admin/AdminInbox";
import { AdminLogin } from "@/components/admin/AdminLogin";

type Phase = "loading" | "login" | "inbox";

export function AdminApp() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [username, setUsername] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/session")
      .then(async (response) => {
        if (cancelled) return;
        if (!response.ok) {
          setPhase("login");
          return;
        }
        const payload = (await response.json().catch(() => null)) as { username?: string } | null;
        setUsername(payload?.username || "admin");
        setPhase("inbox");
      })
      .catch(() => {
        if (!cancelled) setPhase("login");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const showLogin = useCallback(() => {
    setUsername("");
    setPhase("login");
  }, []);

  if (phase === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    );
  }

  if (phase === "login") {
    return (
      <AdminLogin
        onSuccess={(nextUsername) => {
          setUsername(nextUsername);
          setPhase("inbox");
        }}
      />
    );
  }

  return <AdminInbox username={username} onLogout={showLogin} />;
}
