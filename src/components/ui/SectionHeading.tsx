import { container } from "@/lib/styles";

export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-3xl tracking-tight text-pine sm:text-4xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-3 text-base leading-relaxed text-muted">{text}</p>
      ) : null}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <section className="bg-pine text-white">
      <div className={`${container} py-14 sm:py-20`}>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">
          {title}
        </h1>
        {text ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            {text}
          </p>
        ) : null}
      </div>
    </section>
  );
}
