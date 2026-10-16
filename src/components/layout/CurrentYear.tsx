"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getYear() {
  return new Date().getFullYear();
}

export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getYear, () => 2026);
  return <span>{year}</span>;
}
