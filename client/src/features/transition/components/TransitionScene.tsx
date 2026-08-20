import type { PropsWithChildren } from "react";

import { SceneTransition } from "@/lib/motion";

/**
 * Shared wrapper for every transition scene.
 * Delegates animation to the Ki motion system.
 */
export function TransitionScene({ children }: PropsWithChildren) {
  return <SceneTransition>{children}</SceneTransition>;
}
