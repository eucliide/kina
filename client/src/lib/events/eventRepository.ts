import { supabase } from "../supabase";
import type { Event } from "./event.types";

/**
 * Type representing the response from lookup_event_by_code RPC.
 */
type EventLookupRow = {
  id: string;
  code: string;
  name: string;
  stage: string;
  host_id: string | null;
  current_activity_id: string | null;
  current_round: number | null;
  round_started_at: string | null;
  round_ends_at: string | null;
  created_at: string | null;
};

/**
 * Loads an event by its join code.
 * 
 * Uses secure RPC that validates:
 * - Event exists
 * - Event is joinable (waiting or activity stage)
 * - Event has not expired (< 48 hours old)
 */
export async function getEventByCode(
  code: string
): Promise<Event> {
  const { data, error } = await supabase
    .rpc("lookup_event_by_code", { join_code: code })
    .single();

  if (error || !data) {
    throw new Error("Invalid gathering code");
  }

  // Type-narrow the RPC response
  const eventRow = data as EventLookupRow;

  // RPC already validates joinability and expiration server-side
  // Expand to match Event type
  return {
    id: eventRow.id,
    code: eventRow.code,
    name: eventRow.name,
    stage: eventRow.stage as "waiting" | "activity" | "completed",
    host_id: eventRow.host_id ?? '',
    current_activity_id: eventRow.current_activity_id,
    current_round: eventRow.current_round,
    round_started_at: eventRow.round_started_at,
    round_ends_at: eventRow.round_ends_at,
    created_at: eventRow.created_at ?? new Date().toISOString(),
  };
}
