import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{ className?: string }>;

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/5 p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
