import type { PropsWithChildren } from "react";

type TypographyProps = PropsWithChildren<{ className?: string }>;

export function Heading({ children, className }: TypographyProps) {
  return (
    <h1
      className={[
        "text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </h1>
  );
}

export function Text({ children, className }: TypographyProps) {
  return (
    <p
      className={[
        "mt-4 text-base leading-7 text-slate-400",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
