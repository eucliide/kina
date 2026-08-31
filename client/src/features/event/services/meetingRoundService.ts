import { supabase } from "@/lib/supabase";

type StartRoundResponse = {
  round_started_at: string;
  round_ends_at: string;
};

type AdvanceRoundResponse = {
  success: boolean;
  current_round: number;
  round_started_at: string;
  round_ends_at: string;
};

/**
 * Starts the authoritative 20-minute partner rotation.
 */
export async function startRound(
  eventId: string,
  roundNumber: number,
): Promise<{
  roundStartedAt: string;
  roundEndsAt: string;
} | null> {
  const { data, error } = await supabase.rpc(
    "start_event_round",
    {
      p_event_id: eventId,
      p_round_number: roundNumber,
    },
  );

  if (error) {
    console.error(
      "Failed to start round:",
      error,
    );

    return null;
  }

  if (!data) {
    console.error(
      "start_event_round returned no data.",
    );

    return null;
  }

  const result = data as StartRoundResponse;

  if (
    !result.round_started_at ||
    !result.round_ends_at
  ) {
    console.error(
      "Invalid start_event_round response:",
      result,
    );

    return null;
  }

  return {
    roundStartedAt: result.round_started_at,
    roundEndsAt: result.round_ends_at,
  };
}

/**
 * Advances the authoritative database round.
 */
export async function advanceToNextRound(
  eventId: string,
  currentRound: number,
): Promise<boolean> {
  const { data, error } = await supabase.rpc(
    "advance_event_round",
    {
      p_event_id: eventId,
      p_expected_current_round: currentRound,
    },
  );

  if (error) {
    console.error(
      "Failed to advance round:",
      error,
    );

    return false;
  }

  if (!data) {
    console.error(
      "advance_event_round returned no data.",
    );

    return false;
  }

  const result = data as AdvanceRoundResponse;

  return result.success === true;
}

/**
 * Loads the authoritative meeting state.
 */
export async function getEventMeetingState(
  eventId: string,
): Promise<{
  currentRound: number | null;
  roundStartedAt: string | null;
  roundEndsAt: string | null;
  stage: string | null;
  currentActivityId: string | null;
} | null> {
  const { data, error } = await supabase
    .from("events")
    .select(
      `
      current_round,
      round_started_at,
      round_ends_at,
      stage,
      current_activity_id
      `,
    )
    .eq("id", eventId)
    .single();

  if (error) {
    console.error(
      "Failed to load event meeting state:",
      error,
    );

    return null;
  }

  if (!data) {
    return null;
  }

  return {
    currentRound: data.current_round,
    roundStartedAt: data.round_started_at,
    roundEndsAt: data.round_ends_at,
    stage: data.stage,
    currentActivityId:
      data.current_activity_id,
  };
}
