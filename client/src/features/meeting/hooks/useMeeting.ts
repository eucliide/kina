import { useEffect, useState } from "react";
import type { MeetingView } from "../types/meetingView";

import { QUESTIONS } from "../data/questions";

import {
  getSession,
  updateSession,
} from "../services/meetingSession";

import type { MeetingSession } from "../types";

const CONVERSATION_DURATION = 7 * 60 + 30;
const REFLECTION_DURATION = 30;
const TOTAL_ROUNDS = 2;

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

  const [remainingSeconds, setRemainingSeconds] =
    useState(CONVERSATION_DURATION);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemainingSeconds((seconds) => {
        // Continue counting down.
        if (seconds > 1) {
          return seconds - 1;
        }

        let nextDuration = 0;

        setSession((current) => {
          let updated: MeetingSession;

          /**
           * Conversation → Reflection
           */
          if (current.phase === "conversation") {
            updated = {
              ...current,
              phase: "reflection",
            };

            nextDuration = REFLECTION_DURATION;
          }

          /**
           * Reflection finished.
           */
          else {
            /**
             * Last round completed.
             */
            if (
              current.round >= TOTAL_ROUNDS
            ) {
              updated = {
                ...current,
                phase: "complete",
              };

              updateSession(updated);

              clearInterval(interval);

              window.setTimeout(() => {
                setView("transition");
              }, 250);

              return updated;
            }

            /**
             * Start next round.
             */
            updated = {
              ...current,
              round: current.round + 1,
              phase: "conversation",
            };

            nextDuration =
              CONVERSATION_DURATION;
          }

          updateSession(updated);

          return updated;
        });

        return nextDuration;
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

    question:
      QUESTIONS[session.round - 1],

    remainingSeconds,

    remainingTime: `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`,
  };
}
