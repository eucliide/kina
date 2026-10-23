import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";

import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

import {
  loadParticipants,
  sendInvitation as sendInvitationRequest,
  getParticipantById,
  mapIncomingInvitation,
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
 * and creates the meeting session.
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

    void updatePresenceStatus(
      event.id,
      "available",
    );
    const eventId = event.id;

    async function fetchParticipants() {
      try {
        const loaded =
          await loadParticipants(
            eventId,
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
          `event-participants:${eventId}`,
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "event_participants",
            filter:
            `event_id=eq.${eventId}`,
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
          async (
            payload: RealtimePostgresChangesPayload<{
              id: string;
              sender_id: string;
              status: "pending" | "accepted" | "declined" | "cancelled";
            }>,
          ) => {
            try {
              const mapped = await mapIncomingInvitation(
                payload.new as {
                  id: string;
                  sender_id: string;
                  status: "pending" | "accepted" | "declined" | "cancelled";
                },
              );

              if (!mapped) {
                return;
              }

              setIncomingInvitation(mapped);
              setState("received");
            } catch (error) {
              console.error(error);
            }
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
          async (
            payload: RealtimePostgresChangesPayload<{
              receiver_id: string;
              status: "pending" | "accepted" | "declined" | "cancelled";
            }>,
          ) => {
            const invitation =
              payload.new as {
                receiver_id: string;
                status: "pending" | "accepted" | "declined" | "cancelled";
              };

            if (
              invitation.status !==
              "accepted"
            ) {
              return;
            }

            try {
              const partner = await getParticipantById(
                invitation.receiver_id,
              );

              await startConversation(
                eventId,
                {
                  ...partner,
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

    if (!event) {
      console.error("No active event.");
      return;
    }

    try {
      const invitationId =
        await sendInvitationRequest(
          event.id,
          participant.id,
        );

      setSentInvitationId(invitationId);
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

  function receiveInvitation(
    invitation?: IncomingInvitation,
  ) {
    if (!invitation) {
      return;
    }

    setIncomingInvitation(invitation);
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
