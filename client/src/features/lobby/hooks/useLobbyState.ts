import { useState } from "react";

export type LobbyState =
  | "waiting"
  | "available"
  | "sent"
  | "received";

export function useLobbyState() {
  const [state, setState] =
    useState<LobbyState>("available");

  const [selectedParticipant, setSelectedParticipant] =
    useState("");

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
    selectedParticipant,

    sendInvitation,
    cancelInvitation,
    receiveInvitation,
  };
}
