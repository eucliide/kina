import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  TOTAL_PARTNER_ROTATIONS,
} from "@/features/event/constants/event";

import {
  advanceToNextRound,
} from "@/features/event/services/meetingRoundService";

interface StageLike {
  id: string;
  chapter: number;
}

interface UseRotationCompletionArgs {
  eventId: string | undefined;
  roundEndsAt: Date | null;
  remainingSeconds: number | null;
  currentStage: StageLike;
  partnerRotation: number;
  transitionState: string;
  setTransitionState: (
    nextState: string,
  ) => void;
  completeCurrentChapter: (
    chapter: number,
  ) => void;
}

export function useRotationCompletion({
  eventId,
  roundEndsAt,
  remainingSeconds,
  currentStage,
  partnerRotation,
  transitionState,
  setTransitionState,
  completeCurrentChapter,
}: UseRotationCompletionArgs) {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !eventId ||
      !roundEndsAt
    ) {
      return;
    }

    if (
      currentStage.id !==
      "reflection"
    ) {
      return;
    }

    if (
      remainingSeconds === null ||
      remainingSeconds > 0
    ) {
      return;
    }

    if (
      Date.now() <
      roundEndsAt.getTime()
    ) {
      return;
    }

    if (
      transitionState ===
      "transitioning"
    ) {
      return;
    }

    setTransitionState(
      "transitioning",
    );

    completeCurrentChapter(
      currentStage.chapter,
    );

    if (
      partnerRotation <
      TOTAL_PARTNER_ROTATIONS
    ) {
      advanceToNextRound(
        eventId,
        partnerRotation,
      ).then((success) => {
        if (!success) {
          setTransitionState("idle");
          return;
        }

        navigate("/lobby");
      });

      return;
    }

    navigate("/wnrs");
  }, [
    completeCurrentChapter,
    currentStage,
    eventId,
    navigate,
    partnerRotation,
    remainingSeconds,
    roundEndsAt,
    setTransitionState,
    transitionState,
  ]);
}
