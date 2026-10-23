import { supabase } from "@/lib/supabase";

import type { Participant } from "../types";

interface EventParticipantRow {
  id: string;
  participant_id: string;
  display_name: string;
  presence_status: "available" | "inConversation";
}

interface EventInvitationRow {
  id: string;
  event_id: string;
  sender_id: string;
  receiver_id: string;
  status: "pending" | "accepted" | "declined" | "cancelled";
}

async function requireAuthenticatedUserId(): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user.");
  }

  return user.id;
}

function mapParticipant(row: EventParticipantRow): Participant {
  return {
    id: row.id,
    name: row.display_name,
    status: row.presence_status,
  };
}

async function getCurrentParticipantRowId(
  eventId: string,
): Promise<string> {
  const userId = await requireAuthenticatedUserId();

  const { data, error } = await supabase
    .from("event_participants")
    .select("id")
    .eq("event_id", eventId)
    .eq("participant_id", userId)
    .single();

  if (error) {
    throw error;
  }

  if (!data?.id) {
    throw new Error(
      "Sender is not registered for this event.",
    );
  }

  return data.id;
}

/**
 * Registers the authenticated user
 * as a participant in the event.
 */
export async function registerParticipant(
  eventId: string,
  displayName: string,
): Promise<Participant> {
  const userId = await requireAuthenticatedUserId();

  const { data, error } = await supabase
    .from("event_participants")
    .upsert(
      {
        event_id: eventId,
        participant_id: userId,
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

  if (!data) {
    throw new Error(
      "Participant registration returned no data.",
    );
  }

  const row = data as EventParticipantRow;

  return mapParticipant(row);
}

/**
 * Loads other participants currently
 * in the event.
 */
export async function loadParticipants(
  eventId: string,
): Promise<Participant[]> {
  const userId = await requireAuthenticatedUserId();

  const { data, error } = await supabase
    .from("event_participants")
    .select(`
      id,
      participant_id,
      display_name,
      presence_status
    `)
    .eq("event_id", eventId)
    .neq("participant_id", userId)
    .order("joined_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data as EventParticipantRow[]).map(
    mapParticipant,
  );
}

export async function getParticipantById(
  participantId: string,
): Promise<Participant> {
  const { data, error } = await supabase
    .from("event_participants")
    .select(`
      id,
      participant_id,
      display_name,
      presence_status
    `)
    .eq("id", participantId)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error(
      "Participant not found.",
    );
  }

  return mapParticipant(
    data as EventParticipantRow,
  );
}

export async function getParticipantDisplayName(
  participantId: string,
): Promise<string> {
  const { data, error } = await supabase
    .from("event_participants")
    .select("display_name")
    .eq("id", participantId)
    .single();

  if (error) {
    throw error;
  }

  if (!data?.display_name) {
    throw new Error(
      "Participant display name not found.",
    );
  }

  return data.display_name;
}

/**
 * Sends a conversation invitation.
 */
export async function sendInvitation(
  eventId: string,
  receiverId: string,
): Promise<string> {
  const senderId = await getCurrentParticipantRowId(
    eventId,
  );

  const { data, error } = await supabase
    .from("event_invitations")
    .insert({
      event_id: eventId,
      sender_id: senderId,
      receiver_id: receiverId,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  if (!data?.id) {
    throw new Error(
      "Invitation creation returned no id.",
    );
  }

  return data.id;
}

export async function mapIncomingInvitation(
  invitation: Pick<
    EventInvitationRow,
    "id" | "sender_id" | "status"
  >,
): Promise<{
  id: string;
  senderId: string;
  senderName: string;
} | null> {
  if (invitation.status !== "pending") {
    return null;
  }

  const senderName = await getParticipantDisplayName(
    invitation.sender_id,
  );

  return {
    id: invitation.id,
    senderId: invitation.sender_id,
    senderName,
  };
}

/**
 * Accepts an incoming invitation.
 */
export async function acceptInvitation(
  invitationId: string,
): Promise<void> {
  const { error } = await supabase
    .from("event_invitations")
    .update({
      status: "accepted",
    })
    .eq("id", invitationId);

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
  const { error } = await supabase
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
 * Updates the presence status of the
 * current authenticated participant.
 */
export async function updatePresenceStatus(
  eventId: string,
  status: "available" | "inConversation",
): Promise<void> {
  const userId = await requireAuthenticatedUserId();

  const { error } = await supabase
    .from("event_participants")
    .update({ presence_status: status })
    .eq("event_id", eventId)
    .eq("participant_id", userId);

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
  const { error } = await supabase
    .from("event_invitations")
    .update({
      status: "cancelled",
    })
    .eq("id", invitationId);

  if (error) {
    throw error;
  }
}
