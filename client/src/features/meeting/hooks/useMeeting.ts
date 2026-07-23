import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { QUESTIONS } from "../data/questions";
import {
  getSession,
  updateSession,
} from "../services/meetingSession";
import type { MeetingSession } from "../types";

const CONVERSATION_DURATION = 8 * 60;
const REFLECTION_DURATION = 30;
const TOTAL_ROUNDS = 3;

export function useMeeting() {
  const navigate = useNavigate();

  const [session, setSession] = useState<MeetingSession>(() => {
    const existing = getSession();

    if (!existing) {
      throw new Error("No active meeting session.");
    }

    return existing;
  });

  const [remainingSeconds, setRemainingSeconds] = useState(
    CONVERSATION_DURATION,
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemainingSeconds((currentSeconds) => {
        if (currentSeconds > 1) {
          return currentSeconds - 1;
        }

        setSession((current) => {
          let updated: MeetingSession;

          if (current.phase === "conversation") {
            updated = {
              ...current,
              phase: "reflection",
            };

            updateSession(updated);
            return updated;
          }

          if (current.round < TOTAL_ROUNDS) {
            updated = {
              ...current,
              round: current.round + 1,
              phase: "conversation",
            };

            updateSession(updated);
            return updated;
          }

          updated = {
            ...current,
            phase: "complete",
          };

          updateSession(updated);
          clearInterval(interval);
          navigate("/reflection");

          return updated;
        });

        return session.phase === "conversation"
          ? REFLECTION_DURATION
          : session.round < TOTAL_ROUNDS
            ? CONVERSATION_DURATION
            : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, session.phase, session.round]);

  useEffect(() => {
    if (remainingSeconds === 60 || remainingSeconds === 10) {
      console.log("Beep");
    }
  }, [remainingSeconds]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return {
    session,
    question: QUESTIONS[session.round - 1],
    remainingSeconds,
    remainingTime: `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`,
  };
}
