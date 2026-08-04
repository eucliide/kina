import { supabase } from "@/lib/supabase";

import type { Participant } from "../types";

interface DatabaseParticipant {
  id: string;
  display_name: string;
  presence_status:
    | "available"
    | "inConversation";
}

/**
 * Registers the current user
 * as a participant in an event.
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
        display_name,
        presence_status
      `)
      .single();

  if (error) {
    throw error;
  }

  const participant =
    data as DatabaseParticipant;

  return {
    id: participant.id,
    name: participant.display_name,
    status:
      participant.presence_status,
  };
}

/**
 * Loads participants for an event.
 */
export async function loadParticipants(
  eventId: string,
): Promise<Participant[]> {
  const { data, error } =
    await supabase
      .from("event_participants")
      .select(`
        id,
        display_name,
        presence_status
      `)
      .eq("event_id", eventId)
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
