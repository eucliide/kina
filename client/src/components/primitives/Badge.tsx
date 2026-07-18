import type { PropsWithChildren } from "react";

type BadgeProps = PropsWithChildren;

export function Badge({ children }: BadgeProps) {
  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        bg-white/10
        px-3
        py-1
        text-xs
        text-text-secondary
      "
    >
      {children}
    </span>
  );
}
