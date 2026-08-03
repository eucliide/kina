import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createSession } from "@/features/meeting/services/meetingSession";
import {
  getJoinedParticipant,
} from "@/features/join/services/joinSession";

import type {
  LobbyState,
  Participant,
} from "../types";

export function useLobbyState() {
  const [state, setState] =
    useState<LobbyState>(
      "available",
    );

  const [
    selectedParticipant,
    setSelectedParticipant,
  ] = useState("");

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

  function sendInvitation(
    name: string,
  ) {
    const participant =
      participants.find(
        (item) =>
          item.name === name,
      );

    if (!participant) {
      return;
    }

    setSelectedParticipant(
      participant.id,
    );

    createSession(
      participant,
    );

    navigate("/meeting");
  }

  function cancelInvitation() {
    setSelectedParticipant("");
    setState("available");
  }

  function receiveInvitation() {
    setState("received");
  }

  function acceptInvitation() {
    const participant =
      getJoinedParticipant();

    if (!participant) {
      navigate("/join");
      return;
    }

    createSession(
      participant,
    );

    navigate("/meeting");
  }

  function declineInvitation() {
    setState("available");
  }

  return {
    state,
    setState,

    participants,
    selectedParticipant,

    sendInvitation,
    cancelInvitation,

    receiveInvitation,

    acceptInvitation,
    declineInvitation,
  };
}
