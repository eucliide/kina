import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";

import {
  loadParticipants,
  sendInvitation as createInvitation,
  acceptInvitation as acceptInvitationRequest,
  declineInvitation as declineInvitationRequest,
} from "../services/lobbyService";

import {
  createSession,
  getSession,
} from "@/features/meeting/services/meetingSession";

import {
  getJoinedEvent,
  getJoinedParticipant,
} from "@/features/join/services/joinSession";

import type {
  Participant,
} from "../types";

interface IncomingInvitation {
  id: string;
  senderId: string;
  senderName: string;
}

export function useLobbyState() {
  const [state, setState] =
    useState("available");

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

    if (
      !event ||
      !currentParticipant
    ) {
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
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "event_invitations",
            filter:
              `sender_id=eq.${currentParticipant.id}`,
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

              /*
               * If this is a new conversation
               * after returning to the lobby,
               * advance to the next partner rotation.
               *
               * The first meeting has no existing
               * session, so it starts at rotation 1.
               */
              const previousSession =
                getSession();

              const nextRotation =
                previousSession
                  ? Math.min(
                      previousSession.partnerRotation +
                        1,
                      4,
                    )
                  : 1;

              createSession(
                {
                  id: partner.id,
                  name:
                    partner.display_name,
                },
                nextRotation,
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

  async function acceptInvitation() {
    if (!incomingInvitation) {
      return;
    }

    try {
      await acceptInvitationRequest(
        incomingInvitation.id,
      );

      /*
       * The RPC has paired both
       * participants.
       */
      const previousSession =
        getSession();

      const nextRotation =
        previousSession
          ? Math.min(
              previousSession.partnerRotation +
                1,
              4,
            )
          : 1;

      createSession(
        {
          id:
            incomingInvitation.senderId,
          name:
            incomingInvitation.senderName,
        },
        nextRotation,
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
