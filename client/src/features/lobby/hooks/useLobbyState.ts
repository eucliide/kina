import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";

import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

import {
  loadParticipants,
  acceptInvitation as acceptInvitationRequest,
  declineInvitation as declineInvitationRequest,
  cancelInvitation as cancelInvitationRequest,
  updatePresenceStatus,
} from "../services/lobbyService";

import {
  createSession,
  getSession,
} from "@/features/meeting/services/meetingSession";

import {
  TOTAL_PARTNER_ROTATIONS,
} from "@/features/event/constants/event";

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

/**
 * Computes the next rotation number,
 * marks the current user as inConversation,
 * creates the meeting session, and starts
 * the event round if needed.
 *
 * Single source of truth for rotation
 * advancement — used by both the sender
 * (invitation accepted) and the receiver
 * (accept button).
 */
async function startConversation(
  eventId: string,
  partner: Participant,
): Promise<void> {
  const previous = getSession();

  const nextRotation = previous
    ? Math.min(
        previous.partnerRotation + 1,
        TOTAL_PARTNER_ROTATIONS,
      )
    : 1;

  await updatePresenceStatus(eventId, "inConversation");

  createSession(partner, nextRotation);
  
  // Initialize the round timing when starting a conversation
  // This sets round_started_at and round_ends_at on the event
  const { startRound } = await import("@/features/event/services/meetingRoundService");
  await startRound(eventId, nextRotation);
}

export function useLobbyState() {
  const [state, setState] =
    useState<LobbyState>("available");

  const [
    selectedParticipant,
    setSelectedParticipant,
  ] = useState("");

  const [
    sentInvitationId,
    setSentInvitationId,
  ] = useState<string | null>(null);

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

    if (
      !event ||
      !currentParticipant
    ) {
      navigate("/join");
      return;
    }

    /*
     * Restore presence to available
     * whenever the lobby mounts
     * (covers returning from a meeting).
     */
    void updatePresenceStatus(
      event.id,
      "available",
    );

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
          async (payload: RealtimePostgresChangesPayload<{
              id: string;
              sender_id: string;
              receiver_id: string;
              status: string;
            }>) => {
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
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "event_invitations",
            filter:
              `sender_id=eq.${currentParticipant.id}`,
          },
          async (payload: RealtimePostgresChangesPayload<{
              id: string;
              sender_id: string;
              receiver_id: string;
              status: string;
            }>) => {
            const invitation =
              payload.new as {
                id: string;
                sender_id: string;
                receiver_id: string;
                status: string;
              };

            if (
              invitation.status !==
              "accepted"
            ) {
              return;
            }

            try {
              const {
                data: partner,
                error,
              } = await supabase
                .from(
                  "event_participants",
                )
                .select(`
                  id,
                  display_name,
                  presence_status
                `)
                .eq(
                  "id",
                  invitation.receiver_id,
                )
                .single();

              if (error) {
                throw error;
              }

              await startConversation(
                event!.id,
                {
                  id: partner.id,
                  name: partner.display_name,
                  status: "inConversation",
                },
              );

              navigate("/meeting");
            } catch (error) {
              console.error(error);
            }
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
  }, [navigate]);

  async function sendInvitation(
    participant: Participant,
  ) {
    const event = getJoinedEvent();
    const currentParticipant = getJoinedParticipant();

    if (!event || !currentParticipant) {
      console.error("No active event or participant.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("event_invitations")
        .insert({
          event_id: event.id,
          sender_id: currentParticipant.id,
          receiver_id: participant.id,
          status: "pending",
        })
        .select("id")
        .single();

      if (error) throw error;

      setSentInvitationId(data.id);
      setSelectedParticipant(participant.name);
      setState("sent");
    } catch (error) {
      console.error(error);
    }
  }

  async function cancelInvitation() {
    if (sentInvitationId) {
      try {
        await cancelInvitationRequest(sentInvitationId);
      } catch (error) {
        console.error(error);
      }
    }

    setSentInvitationId(null);
    setSelectedParticipant("");
    setState("available");
  }

  function receiveInvitation() {
    setState("received");
  }

  async function acceptInvitation() {
    if (!incomingInvitation) {
      return;
    }

    const event = getJoinedEvent();

    if (!event) {
      return;
    }

    try {
      await acceptInvitationRequest(
        incomingInvitation.id,
      );

      await startConversation(
        event.id,
        {
          id: incomingInvitation.senderId,
          name: incomingInvitation.senderName,
          status: "inConversation",
        },
      );

      setIncomingInvitation(null);

      navigate("/meeting");
    } catch (error) {
      console.error(error);
    }
  }

  async function declineInvitation() {
    if (!incomingInvitation) {
      return;
    }

    try {
      await declineInvitationRequest(
        incomingInvitation.id,
      );

      setIncomingInvitation(null);
      setState("available");
    } catch (error) {
      console.error(error);
    }
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
