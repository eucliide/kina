import { supabase } from "../supabase";
import type { Event } from "./event.types";

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

  // RPC already validates joinability and expiration server-side
  // Expand minimal return to match Event type
  return {
    id: data.id,
    code: data.code,
    name: data.name,
    stage: data.stage,
    host_id: data.host_id || '',
    current_activity_id: data.current_activity_id || null,
    current_round: data.current_round || null,
    round_started_at: data.round_started_at || null,
    round_ends_at: data.round_ends_at || null,
    created_at: data.created_at || new Date().toISOString(),
  } as Event;
}
