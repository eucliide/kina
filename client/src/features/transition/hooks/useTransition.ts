import { useEffect, useState } from "react";

import type {
  Transition,
  TransitionScene,
} from "@/features/event/types/transition";

import {
  getFirstScene,
  getNextScene,
} from "@/features/event/services/transitionService";

/**
 * Controls playback of a transition.
 */
export function useTransition(
  transition: Transition,
) {
  const [currentScene, setCurrentScene] =
    useState<TransitionScene>(() =>
      getFirstScene(transition),
    );

  const [isFinished, setIsFinished] =
    useState(false);

  useEffect(() => {
    if (isFinished) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const nextScene = getNextScene(
        transition,
        currentScene.id,
      );

      if (!nextScene) {
        setIsFinished(true);
        return;
      }

      setCurrentScene(nextScene);
    }, currentScene.durationMs);

    return () => clearTimeout(timeout);
  }, [
    transition,
    currentScene,
    isFinished,
  ]);

  return {
    currentScene,
    isFinished,
  };
}
