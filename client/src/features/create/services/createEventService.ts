import { supabase } from "@/lib/supabase";

function generateJoinCode(): string {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "KI-";

  for (let i = 0; i < 6; i++) {
    code += characters[
      Math.floor(
        Math.random() * characters.length,
      )
    ];
  }

  return code;
}

export interface CreateEventInput {
  hostName: string;
}

export async function createEvent({
  hostName,
}: CreateEventInput) {
  /**
   * Get the currently authenticated
   * Supabase user.
   *
   * Anonymous authentication means
   * the user does not need an account
   * or login screen.
   */
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "No authenticated user.",
    );
  }

  /**
   * Generate the event join code.
   */
  const code = generateJoinCode();

  /**
   * Create the event.
   */
  const {
    data: event,
    error: eventError,
  } = await supabase
    .from("events")
    .insert({
      name: "Ki Meetup",

      code,

      stage: "waiting",

      current_activity_id:
        "conversationJourney",

      host_id: user.id,
    })
    .select()
    .single();

  if (eventError) {
    throw eventError;
  }

  /**
   * Add the host as the first
   * event participant.
   */
  const {
    data: participantData,
    error: participantError,
  } = await supabase
    .from("event_participants")
    .insert({
      event_id: event.id,

      participant_id: user.id,

      display_name: hostName,

      presence_status:
        "available",

      partner_rotation: 1,
    })
    .select("id, display_name, presence_status")
    .single();

  if (participantError) {
    throw participantError;
  }

  return {
    event,
    code,
    participant: participantData,
  };
}
