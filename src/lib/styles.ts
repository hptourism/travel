const variants = {
  primary: "bg-forest text-white hover:bg-pine",
  gold: "bg-gold text-ink hover:bg-gold-deep",
  light: "border border-line bg-white text-pine hover:bg-mint",
  outline: "border border-white/40 text-white hover:bg-white/10",
} as const;

export function buttonClass(
  variant: keyof typeof variants = "primary",
  extra = "",
) {
  return `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${extra}`;
}

export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";
