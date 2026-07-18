import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren;

export function Card({ children }: CardProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/10
        bg-surface
        p-6
        shadow-soft
      "
    >
      {children}
    </div>
  );
}
