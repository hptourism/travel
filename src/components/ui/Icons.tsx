import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function IconMountain(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 19h18L14.5 7.5 10 14l-2.2-3.2L3 19Z" />
      <path d="M14.5 7.5 16.2 10" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 4.5h2.2l1.2 3-1.6 1a12 12 0 0 0 5.7 5.7l1-1.6 3 1.2V16a2 2 0 0 1-2.2 2A14.5 14.5 0 0 1 6 7.7 2 2 0 0 1 8 4.5Z" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export function IconCar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 15v2M20 15v2" />
      <path d="M5 16h14l-1.2-4.2a2 2 0 0 0-1.9-1.4H8.1a2 2 0 0 0-1.9 1.4L5 16Z" />
      <path d="M7.5 10.4 8.8 7.6A2 2 0 0 1 10.6 6.5h2.8a2 2 0 0 1 1.8 1.1l1.3 2.8" />
      <circle cx="8" cy="16.2" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16.2" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 12.5 4.2 4.2L19 7.5" />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12.04 3C7.33 3 3.5 6.78 3.5 11.43c0 1.48.4 2.92 1.16 4.19L3.4 21l5.52-1.22a8.7 8.7 0 0 0 3.12.57h.01c4.71 0 8.54-3.78 8.54-8.43C20.59 6.78 16.75 3 12.04 3Zm4.95 11.95c-.2.57-1.17 1.09-1.62 1.16-.41.06-.94.09-1.52-.1-.35-.11-.8-.26-1.38-.51-2.43-1.05-4.01-3.5-4.13-3.66-.12-.17-.99-1.31-.99-2.5 0-1.18.62-1.76.84-2 .22-.24.48-.3.64-.3h.46c.15 0 .35-.05.54.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.17-.12.26-.24.4-.12.14-.25.31-.36.42-.12.11-.24.24-.1.46.14.23.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.17.6-.7.76-.94.16-.23.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.15Z"
      />
    </svg>
  );
}

export function IconMessage(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 17 17H9l-4.5 3v-3.5A2.5 2.5 0 0 1 4.5 14.5v-8Z" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
