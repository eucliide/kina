import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type {
  LobbyState,
  Participant,
} from "../types";

export function useLobbyState() {
  const [state, setState] =
    useState<LobbyState>("available");

  const [selectedParticipant, setSelectedParticipant] =
    useState("");

  const navigate = useNavigate();

  const participants: Participant[] = [
    {
      id: "1",
      name: "Sarah",
      status: "available",
    },
    {
      id: "2",
      name: "Kevin",
      status: "available",
    },
    {
      id: "3",
      name: "Alice",
      status: "inConversation",
    },
  ];

  function sendInvitation(name: string) {
    setSelectedParticipant(name);
    setState("sent");
  }

  function cancelInvitation() {
    setSelectedParticipant("");
    setState("available");
  }

  function receiveInvitation() {
    setState("received");
  }

  function acceptInvitation() {
    navigate("/meeting");
  }

  function declineInvitation() {
    setState("available");
  }

  return {
    state,
    participants,
    selectedParticipant,

    sendInvitation,
    cancelInvitation,

    receiveInvitation,

    acceptInvitation,
    declineInvitation,
  };
}
