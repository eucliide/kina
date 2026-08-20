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

/**
 * Registers the authenticated user
 * as a participant in the event.
 *
 * IMPORTANT:
 * Participant.id is the primary key of
 * event_participants.
 *
 * participant_id is the authenticated
 * Supabase user UUID.
 */
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

  const {
    data,
    error,
  } = await supabase
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

  if (!data) {
    throw new Error(
      "Participant registration returned no data.",
    );
  }

  /*
   * IMPORTANT:
   *
   * data.id =
   * event_participants primary key
   *
   * data.participant_id =
   * auth.users UUID
   *
   * The application Participant.id must
   * use data.id because invitations and
   * mission_assignments reference the
   * event_participants row.
   */
  console.log(
    "DEBUG REGISTERED PARTICIPANT",
    {
      rowId: data.id,
      authUserId:
        data.participant_id,
      displayName:
        data.display_name,
    },
  );

  return {
    id: data.id,
    name: data.display_name,
    status:
      data.presence_status,
  };
}

/**
 * Loads other participants currently
 * in the event.
 *
 * The current authenticated user is
 * excluded from the lobby.
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

  const {
    data,
    error,
  } = await supabase
    .from("event_participants")
    .select(`
      id,
      participant_id,
      display_name,
      presence_status
    `)
    .eq(
      "event_id",
      eventId,
    )
    .neq(
      "participant_id",
      user.id,
    )
    .order(
      "joined_at",
      {
        ascending: true,
      },
    );

  if (error) {
    throw error;
  }

  return (
    data as DatabaseParticipant[]
  ).map(
    (participant) => ({
      id: participant.id,
      name:
        participant.display_name,
      status:
        participant.presence_status,
    }),
  );
}

/**
 * Sends a conversation invitation
 * to another participant.
 *
 * receiverId is the event_participants.id
 * primary key.
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

  const {
    data: sender,
    error: senderError,
  } = await supabase
    .from("event_participants")
    .select("id")
    .eq(
      "event_id",
      eventId,
    )
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

  const {
    error,
  } = await supabase
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
 */
export async function acceptInvitation(
  invitationId: string,
): Promise<void> {
  const {
    error,
  } = await supabase
    .from("event_invitations")
    .update({
      status: "accepted",
    })
    .eq(
      "id",
      invitationId,
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
  const {
    error,
  } = await supabase
    .from("event_invitations")
    .update({
      status: "declined",
    })
    .eq(
      "id",
      invitationId,
    );

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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user.");
  }

  const { error } = await supabase
    .from("event_participants")
    .update({ presence_status: status })
    .eq("event_id", eventId)
    .eq("participant_id", user.id);

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
  const {
    error,
  } = await supabase
    .from("event_invitations")
    .update({
      status: "cancelled",
    })
    .eq(
      "id",
      invitationId,
    );

  if (error) {
    throw error;
  }
}
