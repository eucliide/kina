import type { Transition } from "@/features/event/types/transition";
import { Envelope } from "./Envelope";
import { Passport } from "./Passport";
import { PartnerReveal } from "./PartnerReveal";
import { useTransition } from "../hooks/useTransition";

export interface TransitionPlayerProps {
  transition: Transition;

  context: TransitionContext;
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
          partnerName="Kevin"
        />
      );

    default:
      return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      {currentScene.type}
    </div>
  );
}
