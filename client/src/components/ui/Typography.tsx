import type { PropsWithChildren } from "react";

type TypographyProps = PropsWithChildren;

export function Heading({ children }: TypographyProps) {
  return (
    <h1
      className="
      text-4xl
      font-semibold
      tracking-tight
      text-slate-100
      sm:text-5xl"
    >
      {children}
    </h1>
  );
}

export function Text({ children }: TypographyProps) {
  return (
    <p
      className="
      mt-4
      text-base
      leading-7
      text-slate-400"
    >
      {children}
    </p>
  );
}
