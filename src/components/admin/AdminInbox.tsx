"use client";

import { useEffect, useMemo, useState } from "react";
import { buttonClass, container } from "@/lib/styles";
import type { EnquiryView } from "@/lib/enquiry-types";

type AdminInboxProps = {
  username: string;
  onLogout: () => void;
};

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function show(value: string) {
  return value.trim() ? value : "—";
}

export function AdminInbox({ username, onLogout }: AdminInboxProps) {
  const [enquiries, setEnquiries] = useState<EnquiryView[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  async function load() {
    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/admin/enquiries");
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; enquiries?: EnquiryView[] }
        | null;
      if (response.status === 401) {
        onLogout();
        return;
      }
      if (!response.ok || !payload?.ok || !payload.enquiries) {
        setStatus("error");
        setError(payload?.error || "Enquiries could not be loaded.");
        return;
      }
      setEnquiries(payload.enquiries);
      setStatus("ready");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/enquiries")
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as
          | { ok?: boolean; error?: string; enquiries?: EnquiryView[] }
          | null;
        if (cancelled) return;
        if (response.status === 401) {
          onLogout();
          return;
        }
        if (!response.ok || !payload?.ok || !payload.enquiries) {
          setStatus("error");
          setError(payload?.error || "Enquiries could not be loaded.");
          return;
        }
        setEnquiries(payload.enquiries);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
        setError("Network error. Please try again.");
      });
    return () => {
      cancelled = true;
    };
  }, [onLogout]);

  const sources = useMemo(() => {
    return Array.from(new Set(enquiries.map((item) => item.source).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [enquiries]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return enquiries.filter((item) => {
      if (source !== "all" && item.source !== source) return false;
      if (!needle) return true;
      return [
        item.name,
        item.phone,
        item.email,
        item.packageName,
        item.startingFrom,
        item.travellers,
        item.dates,
        item.details,
        item.page,
        item.source,
      ]
        .join("\n")
        .toLowerCase()
        .includes(needle);
    });
  }, [enquiries, query, source]);

  const selected = filtered.find((item) => item.id === selectedId) ?? null;

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      onLogout();
    }
  }

  return (
    <div className="py-8 sm:py-10">
      <div className={container}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">Private</p>
            <h1 className="mt-1 font-serif text-3xl text-pine sm:text-4xl">Enquiries</h1>
            <p className="mt-2 text-sm text-muted">
              Signed in as {username}. Newest submissions are first.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" className={buttonClass("light")} onClick={() => void load()}>
              Refresh
            </button>
            <button
              type="button"
              className={buttonClass("primary")}
              disabled={loggingOut}
              onClick={() => void logout()}
            >
              {loggingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_16rem]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, phone, package, page"
            className="w-full rounded-xl border border-line bg-paper px-3.5 py-3 text-sm text-ink outline-none ring-forest/30 focus:ring-2"
            aria-label="Search enquiries"
          />
          <select
            value={source}
            onChange={(event) => setSource(event.target.value)}
            className="w-full rounded-xl border border-line bg-paper px-3.5 py-3 text-sm text-ink outline-none ring-forest/30 focus:ring-2"
            aria-label="Filter by form"
          >
            <option value="all">All forms</option>
            {sources.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-4 text-sm text-muted">
          {status === "loading"
            ? "Loading enquiries..."
            : `${filtered.length} shown of ${enquiries.length} stored`}
        </p>

        {error ? (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        {status === "ready" && filtered.length === 0 ? (
          <div className="mt-4 rounded-3xl border border-line bg-paper px-5 py-10 text-center text-sm text-muted">
            {enquiries.length === 0
              ? "No enquiries yet. New form submissions will appear here."
              : "No enquiries match this search."}
          </div>
        ) : null}

        <div className="mt-4 space-y-3">
          {filtered.map((item) => {
            const open = item.id === selected?.id;
            return (
              <article key={item.id} className="rounded-3xl border border-line bg-paper">
                <button
                  type="button"
                  className="flex w-full flex-col gap-2 px-4 py-4 text-left sm:px-5"
                  onClick={() => setSelectedId(open ? null : item.id)}
                  aria-expanded={open}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-serif text-xl text-pine">{item.name}</h2>
                    <time className="text-xs text-muted" dateTime={item.createdAt}>
                      {formatWhen(item.createdAt)}
                    </time>
                  </div>
                  <p className="text-sm text-ink">
                    {item.phone}
                    {item.email ? ` · ${item.email}` : ""}
                  </p>
                  <p className="text-sm text-muted">
                    {item.packageName} · from {item.startingFrom}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-forest">
                    {item.source || "Enquiry form"}
                  </p>
                </button>
                {open ? (
                  <dl className="grid gap-3 border-t border-line px-4 py-4 text-sm sm:grid-cols-2 sm:px-5">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Phone</dt>
                      <dd className="mt-1">
                        <a className="font-semibold text-forest underline" href={`tel:${item.phone}`}>
                          {item.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Email</dt>
                      <dd className="mt-1">{show(item.email)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Travellers</dt>
                      <dd className="mt-1">{show(item.travellers)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Dates</dt>
                      <dd className="mt-1">{show(item.dates)}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Trip details</dt>
                      <dd className="mt-1 whitespace-pre-wrap leading-relaxed">{item.details}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Page</dt>
                      <dd className="mt-1 break-all">
                        {item.page.startsWith("/") ? (
                          <a className="text-forest underline" href={item.page}>
                            {item.page}
                          </a>
                        ) : (
                          show(item.page)
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Form</dt>
                      <dd className="mt-1">{show(item.source)}</dd>
                    </div>
                  </dl>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
