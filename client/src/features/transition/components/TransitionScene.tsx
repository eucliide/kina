import type { PropsWithChildren } from "react";

/**
 * Shared wrapper for every
 * transition scene.
 *
 * Keeps layout and animations
 * consistent.
 */
export function TransitionScene({
  children,
}: PropsWithChildren) {
  return (
    <section
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[#07111f]
      "
    >
      {children}
    </section>
  );
}
