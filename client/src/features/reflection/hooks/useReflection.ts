import { useNavigate } from "react-router-dom";

import { PROMPTS } from "../data/prompts";
import {
  clearSession,
  getSession,
} from "@/features/meeting/services/meetingSession";

export function useReflection() {
  const navigate = useNavigate();

  const session = getSession();

  if (!session) {
    throw new Error(
      "No completed meeting session.",
    );
  }

  const prompt =
    PROMPTS[
      Math.floor(
        Math.random() * PROMPTS.length,
      )
    ];

  function continueToLobby() {
    clearSession();

    navigate("/lobby");
  }

  return {
    partnerName:
      session.participant.name,
    prompt,
    continueToLobby,
  };
}
