import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren;

export function Card({ children }: CardProps) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-slate-800
      bg-slate-900
      p-8
      shadow-xl"
    >
      {children}
    </div>
  );
}
