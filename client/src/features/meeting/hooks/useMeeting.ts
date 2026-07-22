import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { QUESTIONS } from "../data/questions";

const ROUND_DURATION = 8 * 60;

export function useMeeting() {
  const navigate = useNavigate();

  const [round, setRound] = useState(1);

  const [remainingSeconds, setRemainingSeconds] =
    useState(ROUND_DURATION);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemainingSeconds((seconds) => {
        if (seconds > 1) {
          return seconds - 1;
        }

        if (round < 3) {
          setRound((currentRound) => currentRound + 1);

          return ROUND_DURATION;
        }

        clearInterval(interval);

        navigate("/reflection");

        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [round, navigate]);

  const minutes = Math.floor(
    remainingSeconds / 60,
  );

  const seconds = remainingSeconds % 60;

  return {
    partner: {
      id: "1",
      name: "Sarah",
    },

    round,

    question: QUESTIONS[round - 1],

    remainingTime:
      `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`,
  };
}
