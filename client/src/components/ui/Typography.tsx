import type { PropsWithChildren } from "react";

type TypographyProps = PropsWithChildren<{ className?: string }>;

export function Heading({ children, className }: TypographyProps) {
  return (
    <h1
      className={[
        "text-3xl font-semibold tracking-tight text-white sm:text-4xl",
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
        "text-base leading-7 text-white/60",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}

/**
 * Small uppercase label — use sparingly.
 * Replaces the repeated uppercase tracking pattern.
 */
export function Label({ children, className }: TypographyProps) {
  return (
    <p
      className={[
        "text-xs font-medium uppercase tracking-widest text-white/35",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
