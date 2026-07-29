import { useState } from "react";

import type { Transition } from "@/features/event/types/transition";

export function useTransitionCoordinator() {
  const [transition, setTransition] =
    useState<Transition | null>(null);

  function startTransition(
    next: Transition,
  ) {
    setTransition(next);
  }

  function finishTransition() {
    setTransition(null);
  }

  return {
    transition,
    startTransition,
    finishTransition,
  };
}
