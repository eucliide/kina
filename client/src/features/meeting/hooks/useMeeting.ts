import { useEffect, useState } from "react";
import type { MeetingState } from "../types/meetingState";
import { getConversationPrompt } from "@/features/activity/services/conversationJourneyService";
import { useConversationPassport } from "@/features/passport/hooks/useConversationPassport";

import {
  getCurrentStage,
  getNextStage,
} from "../services/stageService";

import {
  getSession,
  updateSession,
} from "../services/meetingSession";

import type { MeetingSession } from "../types";

export function useMeeting() {
  /**
   * Current meeting lifecycle state.
   */
  const [state, setState] =
    useState<MeetingState>("meeting");

  const [transitionState, setTransitionState] =
    useState<ChapterTransitionState>(
      "idle",
    );

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

  const {
    passport,
    completeCurrentChapter,
  } = useConversationPassport(
    session.partnerRotation,
  );

  /**
   * Current Conversation Journey stage.
   */
  const currentStage = getCurrentStage(
    session.currentStageId,
  );

  /**
   * Shared prompt shown to both
   * conversation partners.
   */
  const currentPrompt =
    getConversationPrompt(
      session.partnerRotation,
      session.currentStageId,
    );

  if (!currentStage) {
    throw new Error(
      "Unknown conversation stage.",
    );
  }

  const [remainingSeconds, setRemainingSeconds] =
    useState(currentStage.duration);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemainingSeconds((seconds) => {
        if (seconds > 1) {
          return seconds - 1;
        }

        const nextStage = getNextStage(
          session.currentStageId,
        );

        /**
         * Conversation complete.
         */
        if (!nextStage) {
         setTransitionState(
           "transitioning",
         );

         window.setTimeout(() => {
           setState("transition");
         }, 1200);

         return 0;
        }

        /**
         * Complete the current passport chapter
         * before transitioning.
         */
        completeCurrentChapter(
          currentStage.chapter,
        );

        /**
         * Advance to the next stage.
         */
        const updatedSession: MeetingSession = {
          ...session,
          currentStageId: nextStage.id,
        };

        setTransitionState(
          "transitioning",
        );

        window.setTimeout(() => {
          updateSession(updatedSession);

          setSession(updatedSession);

          setTransitionState("idle");
        }, 900);

        return nextStage.duration;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    session.currentStageId,
    session,
    currentStage,
    completeCurrentChapter,
  ]);

  useEffect(() => {
    if (
      remainingSeconds === 60 ||
      remainingSeconds === 10
    ) {
      console.log("Beep");
    }
  }, [remainingSeconds]);

  const minutes = Math.floor(
    remainingSeconds / 60,
  );

  const seconds = remainingSeconds % 60;

  return {
    state,
    setState,

    transitionState,

    passport,

    session,

    currentStage,

    currentPrompt,

    remainingSeconds,

    remainingTime: `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`,
  };
}
