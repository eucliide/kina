import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  clearSession,
  getSession,
} from "@/features/meeting/services/meetingSession";

export function useReflection() {
  const navigate = useNavigate();

  const session = getSession();

  useEffect(() => {
    if (!session) {
      navigate("/lobby");
    }
  }, [navigate, session]);

  function continueToLobby() {
    clearSession();

    navigate("/lobby");
  }

  return {
    partnerName:
      session?.participant.name ??
      "your partner",
    hasSession: Boolean(session),
    continueToLobby,
  };
}
