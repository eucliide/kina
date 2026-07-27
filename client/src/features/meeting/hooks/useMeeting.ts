import { useEffect, useState } from "react";
import type { MeetingView } from "../types/meetingView";
import { getConversationPrompt } from "@/features/activity/services/conversationJourneyService";

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
          setState("transition");

          return 0;
        }

        /**
         * Advance to the next stage.
         */
        const updatedSession: MeetingSession = {
          ...session,
          currentStageId: nextStage.id,
        };

        updateSession(updatedSession);

        setSession(updatedSession);

        return nextStage.duration;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    session,
    currentStage,
    currentPrompt,
    remainingSeconds,

    remainingTime: `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`,
  };
}
