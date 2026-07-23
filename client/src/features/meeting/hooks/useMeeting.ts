import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { meetingSession } from "../data/session";

import { QUESTIONS } from "../data/questions";

import type {
  MeetingParticipant,
  MeetingPhase,
} from "../types";

const CONVERSATION_DURATION = 8 * 60;
const REFLECTION_DURATION = 30;
const TOTAL_ROUNDS = 3;

export function useMeeting() {
  const navigate = useNavigate();

  const [session, setSession] =
    useState(meetingSession);

  const [round, setRound] = useState(1);

  const [phase, setPhase] =
    useState<MeetingPhase>("conversation");

  const [remainingSeconds, setRemainingSeconds] =
    useState(CONVERSATION_DURATION);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemainingSeconds((currentSeconds) => {
        // Countdown
        if (currentSeconds > 1) {
          return currentSeconds - 1;
        }

        // Conversation finished → Reflection
        if (phase === "conversation") {
          setSession((current) => ({
            ...current,

            phase: "reflection",
          }));

          return REFLECTION_DURATION;
        }

        // Reflection finished → Next Round
        if (round < TOTAL_ROUNDS) {
          setSession((current) => ({
            ...current,

            round: current.round + 1,

            phase: "conversation",
          }));

          setPhase("conversation");

          return CONVERSATION_DURATION;
        }

        // Session complete
        clearInterval(interval);

        setSession((current) => ({
          ...current,

          phase: "complete",
        }));

        navigate("/reflection");

        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, round, navigate]);

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
    session,

    question: QUESTIONS[round - 1],

    remainingSeconds,

    remainingTime: `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`,
  };
}
