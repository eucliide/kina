import { supabase } from "@/lib/supabase";

import type { Participant } from "../types";

interface DatabaseParticipant {
  id: string;
  participant_id: string;
  display_name: string;
  presence_status:
    | "available"
    | "inConversation";
}

export async function registerParticipant(
  eventId: string,
  displayName: string,
): Promise<Participant> {
  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(
      "No authenticated user.",
    );
  }

  const { data, error } =
    await supabase
      .from("event_participants")
      .upsert(
        {
          event_id: eventId,
          participant_id: user.id,
          display_name: displayName,
          presence_status: "available",
          partner_rotation: 1,
        },
        {
          onConflict:
            "event_id,participant_id",
        },
      )
      .select(`
        id,
        participant_id,
        display_name,
        presence_status
      `)
      .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    name: data.display_name,
    status: data.presence_status,
  };
}

/**
 * Loads other participants currently
 * in the event.
 *
 * The current user's own row is excluded.
 */
export async function loadParticipants(
  eventId: string,
): Promise<Participant[]> {
  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(
      "No authenticated user.",
    );
  }

  const { data, error } =
    await supabase
      .from("event_participants")
      .select(`
        id,
        participant_id,
        display_name,
        presence_status
      `)
      .eq("event_id", eventId)
      .neq(
        "participant_id",
        user.id,
      )
      .order("joined_at", {
        ascending: true,
      });

  if (error) {
    throw error;
  }

  return (
    data as DatabaseParticipant[]
  ).map((participant) => ({
    id: participant.id,
    name: participant.display_name,
    status:
      participant.presence_status,
  }));
}

/**
 * Sends a conversation invitation
 * to another participant.
 */
export async function sendInvitation(
  eventId: string,
  receiverId: string,
): Promise<void> {
  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(
      "No authenticated user.",
    );
  }

  const { data: sender, error: senderError } =
    await supabase
      .from("event_participants")
      .select("id")
      .eq("event_id", eventId)
      .eq(
        "participant_id",
        user.id,
      )
      .single();

  if (senderError) {
    throw senderError;
  }

  if (!sender) {
    throw new Error(
      "Sender is not registered for this event.",
    );
  }

  const { error } =
    await supabase
      .from("event_invitations")
      .insert({
        event_id: eventId,
        sender_id: sender.id,
        receiver_id: receiverId,
        status: "pending",
      });

  if (error) {
    throw error;
  }
}

/**
 * Accepts an incoming invitation.
 *
 * The database RPC performs the acceptance
 * atomically and pairs both participants.
 */
export async function acceptInvitation(
  invitationId: string,
): Promise<void> {
  const { error } =
    await supabase.rpc(
      "accept_event_invitation",
      {
        invitation_uuid:
          invitationId,
      },
    );

  if (error) {
    throw error;
  }
}

/**
 * Declines an incoming invitation.
 */
export async function declineInvitation(
  invitationId: string,
): Promise<void> {
  const { error } =
    await supabase
      .from("event_invitations")
      .update({
        status: "declined",
      })
      .eq("id", invitationId);

  if (error) {
    throw error;
  }
}

/**
 * Cancels an invitation that the
 * current user sent.
 */
export async function cancelInvitation(
  invitationId: string,
): Promise<void> {
  const { error } =
    await supabase
      .from("event_invitations")
      .update({
        status: "cancelled",
      })
      .eq("id", invitationId);

  if (error) {
    throw error;
  }
}
