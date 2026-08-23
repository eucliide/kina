import { supabase } from "@/lib/supabase";
import { CONVERSATION_STAGES } from "@/features/activity/data/conversationStages";

/**
 * Calculates the total duration for all stages in a round.
 */
function getRoundDuration(): number {
  return CONVERSATION_STAGES.reduce((total, stage) => total + stage.duration, 0);
}

/**
 * Starts a new round for an event.
 * 
 * This is idempotent - if the round is already started with the same round number,
 * it returns the existing state.
 */
export async function startRound(
  eventId: string,
  roundNumber: number,
): Promise<{
  roundStartedAt: string;
  roundEndsAt: string;
} | null> {
  const now = new Date();
  const roundDuration = getRoundDuration();
  const endsAt = new Date(now.getTime() + roundDuration * 1000);

  // Attempt to update - only succeeds if current_round matches or is null
  const { data, error } = await supabase
    .from("events")
    .update({
      current_round: roundNumber,
      round_started_at: now.toISOString(),
      round_ends_at: endsAt.toISOString(),
    })
    .eq("id", eventId)
    .or(`current_round.is.null,current_round.eq.${roundNumber}`)
    .select("round_started_at, round_ends_at")
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
 * This is idempotent - uses a conditional update to ensure only one client
 * can advance from a specific round number.
 */
export async function advanceToNextRound(
  eventId: string,
  currentRound: number,
): Promise<boolean> {
  const nextRound = currentRound + 1;
  const now = new Date();
  const roundDuration = getRoundDuration();
  const endsAt = new Date(now.getTime() + roundDuration * 1000);

  // Only update if current_round still matches expected value
  const { error } = await supabase
    .from("events")
    .update({
      current_round: nextRound,
      round_started_at: now.toISOString(),
      round_ends_at: endsAt.toISOString(),
    })
    .eq("id", eventId)
    .eq("current_round", currentRound);

  if (error) {
    console.error("Failed to advance round:", error);
    return false;
  }

  return true;
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
