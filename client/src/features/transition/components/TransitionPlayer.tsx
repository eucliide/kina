import type { Transition } from "@/features/event/types/transition";

import { useTransition } from "../hooks/useTransition";

export interface TransitionPlayerProps {
  transition: Transition;
}

/**
 * Plays a transition scene
 * by scene.
 */
export function TransitionPlayer({
  transition,
}: TransitionPlayerProps) {
  const {
    currentScene,
    isFinished,
  } = useTransition(
    transition,
  );

  if (isFinished) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      {currentScene.type}
    </div>
  );
}
