import { supabase } from "@/lib/supabase";

import type { Participant } from "../types";

interface DatabaseParticipant {
  id: string;
  display_name: string;
  presence_status: "available" | "inConversation";
}

/**
 * Loads participants for an event.
 */
export async function loadParticipants(
  eventId: string,
): Promise<Participant[]> {
  const { data, error } = await supabase
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

  return (data as DatabaseParticipant[]).map(
    (participant) => ({
      id: participant.id,
      name: participant.display_name,
      status: participant.presence_status,
    }),
  );
}
