import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const [partner] = useState<MeetingParticipant>({
    id: "1",
    name: "Sarah",
  });

  const [round, setRound] = useState(1);

  const [phase, setPhase] =
    useState<MeetingPhase>("conversation");

  const [remainingSeconds, setRemainingSeconds] =
    useState(CONVERSATION_DURATION);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemainingSeconds((currentSeconds) => {
        if (currentSeconds > 1) {
          return currentSeconds - 1;
        }

        // Conversation finished
        if (phase === "conversation") {
          setPhase("reflection");

          return REFLECTION_DURATION;
        }

        // Reflection finished
        if (round < TOTAL_ROUNDS) {
          setRound((currentRound) => currentRound + 1);

          setPhase("conversation");

          return CONVERSATION_DURATION;
        }

        clearInterval(interval);

        navigate("/reflection");

        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, round, navigate]);

  const minutes = Math.floor(
    remainingSeconds / 60,
  );

  const seconds = remainingSeconds % 60;

  return {
    partner,

    phase,

    round,

    question: QUESTIONS[round - 1],

    remainingTime: `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`,
  };
}
