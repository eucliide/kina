import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";

import {
  loadParticipants,
  sendInvitation as createInvitation,
} from "../services/lobbyService";

import {
  createSession,
} from "@/features/meeting/services/meetingSession";

import {
  getJoinedEvent,
  getJoinedParticipant,
} from "@/features/join/services/joinSession";

import type {
  LobbyState,
  Participant,
} from "../types";

interface IncomingInvitation {
  id: string;
  senderId: string;
  senderName: string;
}

export function useLobbyState() {
  const [state, setState] =
    useState<LobbyState>("available");

  const [
    selectedParticipant,
    setSelectedParticipant,
  ] = useState("");

  const [
    incomingInvitation,
    setIncomingInvitation,
  ] =
    useState<IncomingInvitation | null>(
      null,
    );

  const navigate = useNavigate();

  const [participants, setParticipants] =
    useState<Participant[]>([]);

  useEffect(() => {
    const event = getJoinedEvent();

    const currentParticipant =
      getJoinedParticipant();

    if (!event || !currentParticipant) {
      return;
    }

    async function fetchParticipants() {
      try {
        const loaded =
          await loadParticipants(
            event!.id,
          );

        setParticipants(loaded);
      } catch (error) {
        console.error(error);
      }
    }

    fetchParticipants();

    const participantChannel =
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
            filter:
              `event_id=eq.${event.id}`,
          },
          () => {
            fetchParticipants();
          },
        )
        .subscribe();

    const invitationChannel =
      supabase
        .channel(
          `event-invitations:${currentParticipant.id}`,
        )
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "event_invitations",
            filter:
              `receiver_id=eq.${currentParticipant.id}`,
          },
          async (payload) => {
            const invitation =
              payload.new as {
                id: string;
                sender_id: string;
                receiver_id: string;
                status: string;
              };

            if (
              invitation.status !==
              "pending"
            ) {
              return;
            }

            const {
              data: sender,
              error,
            } = await supabase
              .from(
                "event_participants",
              )
              .select(
                "display_name",
              )
              .eq(
                "id",
                invitation.sender_id,
              )
              .single();

            if (error) {
              console.error(error);
              return;
            }

            setIncomingInvitation({
              id: invitation.id,
              senderId:
                invitation.sender_id,
              senderName:
                sender.display_name,
            });

            setState("received");
          },
        )
        .subscribe();

    return () => {
      supabase.removeChannel(
        participantChannel,
      );

      supabase.removeChannel(
        invitationChannel,
      );
    };
  }, []);

  async function sendInvitation(
    participant: Participant,
  ) {
    const event =
      getJoinedEvent();

    if (!event) {
      console.error(
        "No active event found.",
      );
      return;
    }

    try {
      await createInvitation(
        event.id,
        participant.id,
      );

      setSelectedParticipant(
        participant.name,
      );

      setState("sent");
    } catch (error) {
      console.error(error);
    }
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

    if (
      !participant ||
      !incomingInvitation
    ) {
      navigate("/join");
      return;
    }

    createSession({
      id:
        incomingInvitation.senderId,
      name:
        incomingInvitation.senderName,
    });

    navigate("/meeting");
  }

  function declineInvitation() {
    setIncomingInvitation(null);
    setState("available");
  }

  return {
    state,
    setState,

    participants,
    selectedParticipant,
    incomingInvitation,

    sendInvitation,
    cancelInvitation,

    receiveInvitation,

    acceptInvitation,
    declineInvitation,
  };
}
