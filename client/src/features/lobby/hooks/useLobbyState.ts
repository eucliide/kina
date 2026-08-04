import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";

import {
  loadParticipants,
} from "../services/lobbyService";

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
    const event =
      getJoinedEvent();

    if (!event) {
      return;
    }

    async function fetchParticipants() {
      try {
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

    const channel =
      supabase
        .channel(
          `event-participants:${event.id}`,
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "event_participants",
            filter: `event_id=eq.${event.id}`,
          },
          () => {
            fetchParticipants();
          },
        )
        .subscribe();

    return () => {
      supabase.removeChannel(
        channel,
      );
    };
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
