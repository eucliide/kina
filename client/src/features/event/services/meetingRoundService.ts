import { supabase } from "@/lib/supabase";

/**
 * Starts a new round for an event.
 * 
 * Uses secure RPC that:
 * - Verifies caller is a participant
 * - Is idempotent (safe for concurrent calls)
 * - Sets authoritative timestamps
 */
export async function startRound(
  eventId: string,
  roundNumber: number,
): Promise<{
  roundStartedAt: string;
  roundEndsAt: string;
} | null> {
  const { data, error } = await supabase
    .rpc("start_event_round", {
      p_event_id: eventId,
      p_round_number: roundNumber,
    })
    .single();

  if (error) {
    console.error("Failed to start round:", error);
    return null;
  }

  return {
    roundStartedAt: data.round_started_at,
    roundEndsAt: data.round_ends_at,
  };
}

/**
 * Advances to the next round.
 * 
 * Uses secure RPC that:
 * - Verifies caller is a participant
 * - Is idempotent (uses conditional update)
 * - Time-gates advancement (only after round_ends_at)
 */
export async function advanceToNextRound(
  eventId: string,
  currentRound: number,
): Promise<boolean> {
  const { data, error } = await supabase
    .rpc("advance_event_round", {
      p_event_id: eventId,
      p_expected_current_round: currentRound,
    })
    .single();

  if (error) {
    console.error("Failed to advance round:", error);
    return false;
  }

  return data?.success ?? false;
}

/**
 * Loads the current authoritative meeting state for an event.
 */
export async function getEventMeetingState(eventId: string): Promise<{
  currentRound: number | null;
  roundStartedAt: string | null;
  roundEndsAt: string | null;
  stage: string | null;
  currentActivityId: string | null;
} | null> {
  const { data, error } = await supabase
    .from("events")
    .select("current_round, round_started_at, round_ends_at, stage, current_activity_id")
    .eq("id", eventId)
    .single();

  if (error) {
    console.error("Failed to load event meeting state:", error);
    return null;
  }

  return {
    currentRound: data.current_round,
    roundStartedAt: data.round_started_at,
    roundEndsAt: data.round_ends_at,
    stage: data.stage,
    currentActivityId: data.current_activity_id,
  };
}
