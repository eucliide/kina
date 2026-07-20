import { useState } from "react";

import type {
  LobbyState,
  Participant,
} from "../types";

export function useLobbyState() {
  const [state, setState] =
    useState<LobbyState>("available");

  const [selectedParticipant, setSelectedParticipant] =
    useState("");

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

  return {
    state,
    participants,
    selectedParticipant,

    sendInvitation,
    cancelInvitation,
    receiveInvitation,
  };
}
