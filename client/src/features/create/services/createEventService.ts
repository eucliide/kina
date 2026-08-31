import { supabase } from "@/lib/supabase";

function generateJoinCode(): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "KINA-";

  for (let i = 0; i < 6; i += 1) {
    code +=
      characters[Math.floor(Math.random() * characters.length)];
  }

  return code;
}

export interface CreateEventInput {
  gatheringName: string;
}

export interface CreatedEvent {
  id: string;
  name: string;
  code: string;
  stage: "waiting" | "activity" | "completed";
  host_id: string;
  current_activity_id: string | null;
  current_round: number | null;
  round_started_at: string | null;
  round_ends_at: string | null;
  created_at: string;
}

/**
 * Creates a new Kina gathering for the currently
 * authenticated user.
 *
 * Important:
 * - host_id is always taken from auth.uid()
 * - the INSERT is performed separately from the SELECT
 * - the created row is fetched only after the INSERT succeeds
 */
export async function createEvent({
  gatheringName,
}: CreateEventInput): Promise<{
  event: CreatedEvent;
  code: string;
}> {
  const trimmedName = gatheringName.trim();

  if (!trimmedName) {
    throw new Error("Gathering name is required.");
  }

  /*
   * Get the authenticated Supabase user.
   */
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(
      `Failed to get authenticated user: ${userError.message}`,
    );
  }

  if (!user) {
    throw new Error("No authenticated user.");
  }

  const hostId = user.id;
  const code = generateJoinCode();

  console.log("Creating event:", {
    name: trimmedName,
    code,
    hostId,
    userId: user.id,
  });

  /*
   * STEP 1
   *
   * Insert the event without requesting the inserted
   * row back.
   *
   * This isolates INSERT RLS from SELECT RLS.
   */
  const { error: insertError } = await supabase
    .from("events")
    .insert({
      name: trimmedName,
      code,
      stage: "waiting",
      current_activity_id: "conversationJourney",
      host_id: hostId,
    });

  if (insertError) {
    console.error("Failed to insert event:", {
      error: insertError,
      hostId,
      code,
      userId: user.id,
    });

    throw new Error(
      `Failed to create gathering: ${insertError.message}`,
    );
  }

  /*
   * STEP 2
   *
   * Fetch the event after INSERT succeeds.
   *
   * The authenticated host should now satisfy the
   * events SELECT policy through host_id = auth.uid().
   */
  const { data: event, error: fetchError } = await supabase
    .from("events")
    .select(
      `
        id,
        name,
        code,
        stage,
        host_id,
        current_activity_id,
        current_round,
        round_started_at,
        round_ends_at,
        created_at
      `,
    )
    .eq("code", code)
    .eq("host_id", hostId)
    .single();

  if (fetchError) {
    console.error("Event was created but could not be fetched:", {
      error: fetchError,
      code,
      hostId,
    });

    throw new Error(
      `Gathering was created, but could not be loaded: ${fetchError.message}`,
    );
  }

  if (!event) {
    throw new Error(
      "Gathering was created, but no event was returned.",
    );
  }

  return {
    event: event as CreatedEvent,
    code,
  };
}