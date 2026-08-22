import { useNavigate } from "react-router-dom";

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

  function continueToLobby() {
    clearSession();

    navigate("/lobby");
  }

  return {
    partnerName:
      session.participant.name,
    continueToLobby,
  };
}
