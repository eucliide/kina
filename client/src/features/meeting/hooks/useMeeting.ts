import {
  useEffect,
  useState,
} from "react";

import {
  useConversationPassport,
} from "@/features/passport/hooks/useConversationPassport";

import {
  getSession,
} from "../services/meetingSession";

import {
  getJoinedEvent,
} from "@/features/join/services/joinSession";

import {
  playWarningSound,
  playCountdownSound,
} from "../services/sounds";

import type { MeetingSession } from "../types";
import { useMeetingRoundSync } from "./useMeetingRoundSync";
import { useMeetingStageTimer } from "./useMeetingStageTimer";
import { useMeetingPrompt } from "./useMeetingPrompt";
import { useRotationCompletion } from "./useRotationCompletion";

export function useMeeting() {
  const [state, setState] =
    useState("meeting");

  const [session, setSession] =
    useState<MeetingSession>(() => {
      const existing = getSession();

      if (!existing) {
        throw new Error(
          "No active meeting session.",
        );
      }

      return existing;
    });

  const event = getJoinedEvent();

  const {
    passport,
    completeCurrentChapter,
  } = useConversationPassport(
    session.partnerRotation,
  );

  const {
    roundStartedAt,
    roundEndsAt,
  } = useMeetingRoundSync({
    eventId: event?.id,
    session,
    setSession,
  });

  const {
    currentStage,
    transitionState,
    setTransitionState,
    remainingSeconds,
  } = useMeetingStageTimer({
    session,
    setSession,
    roundStartedAt,
    completeCurrentChapter,
  });

  const {
    currentPrompt,
    promptError,
  } = useMeetingPrompt({
    partnerRotation:
      session.partnerRotation,
    stageId: session.currentStageId,
    stageTitle: currentStage.title,
  });

  useRotationCompletion({
    eventId: event?.id,
    roundEndsAt,
    remainingSeconds,
    currentStage,
    partnerRotation:
      session.partnerRotation,
    transitionState,
    setTransitionState,
    completeCurrentChapter,
  });

  useEffect(() => {
    if (remainingSeconds === 60) {
      playWarningSound();
    } else if (remainingSeconds === 10) {
      playCountdownSound();
    }
  }, [remainingSeconds]);

  const displaySeconds =
    remainingSeconds ??
    currentStage.duration;

  const minutes = Math.floor(
    displaySeconds / 60,
  );

  const seconds = displaySeconds % 60;

  return {
    state,
    setState,

    transitionState,

    passport,

    session,

    currentStage,

    currentPrompt,
    promptError,

    remainingSeconds:
      displaySeconds,

    remainingTime:
      `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`,

    roundStartedAt,

    roundEndsAt,
  };
}
