import { useEffect, useRef } from "react";

import type { Transition } from "@/features/event/types/transition";
import type { TransitionContext } from "../types/transitionContext";

import { useTransition } from "../hooks/useTransition";

import {
  Envelope,
  Passport,
  PartnerReveal,
} from ".";

export interface TransitionPlayerProps {
  transition: Transition;
  context: TransitionContext;
  onFinished?: () => void;
}

/**
 * Plays a transition scene by scene.
 */
export function TransitionPlayer({
  transition,
  context,
  onFinished,
}: TransitionPlayerProps) {
  const { currentScene, isFinished } = useTransition(transition);

  const didNotifyFinish = useRef(false);

  // Reset when a new transition starts.
  useEffect(() => {
    didNotifyFinish.current = false;
  }, [transition]);

  useEffect(() => {
    if (!isFinished || didNotifyFinish.current) {
      return;
    }

    didNotifyFinish.current = true;
    onFinished?.();
  }, [isFinished, onFinished]);

  if (isFinished) {
    return null;
  }

  switch (currentScene.type) {
    case "envelope":
      return <Envelope />;

    case "passport":
      return (
        <Passport
          partnerName={context.partnerName}
          activityName={context.activityName}
        />
      );

    case "partnerReveal":
      return (
        <PartnerReveal
          partnerName={context.partnerName}
        />
      );

    default:
      return null;
  }
}
