import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loadParticipants } from "../services/lobbyService";

import { createSession } from "@/features/meeting/services/meetingSession";

import {
  getJoinedEvent,
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

  const [participants, setParticipants] =
    useState<Participant[]>([]);

  useEffect(() => {
    async function fetchParticipants() {
      try {
        const event =
          getJoinedEvent();

        if (!event) {
          return;
        }

        const loaded =
          await loadParticipants(
            event.id,
          );

        setParticipants(loaded);
      } catch (error) {
        console.error(error);
      }
    }

    fetchParticipants();
  }, []);

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
