import { useNavigate } from "react-router-dom";

import { PROMPTS } from "../data/prompts";

export function useReflection() {
  const navigate = useNavigate();

  const prompt =
    PROMPTS[
      Math.floor(
        Math.random() * PROMPTS.length,
      )
    ];

  function continueToLobby() {
    navigate("/lobby");
  }

  return {
    partnerName: "Sarah",
    prompt,
    continueToLobby,
  };
}
