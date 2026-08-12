import { supabase } from "@/lib/supabase";

import type { SecretMission } from "../types/secretMission";

interface MissionAssignment {
  id: string;
  mission_id: string;
}

interface Mission {
  id: string;
  mission_text: string;
}

/**
 * Gets an existing mission assignment.
 */
async function getExistingAssignment(
  eventId: string,
  participantId: string,
): Promise<SecretMission | null> {
  console.log(
    "DEBUG getExistingAssignment",
    {
      eventId,
      participantId,
    },
  );

  const {
    data,
    error,
  } = await supabase
    .from("mission_assignments")
    .select(
      "id, mission_id",
    )
    .eq(
      "event_id",
      eventId,
    )
    .eq(
      "participant_id",
      participantId,
    )
    .maybeSingle();

  console.log(
    "DEBUG ASSIGNMENT RESPONSE",
    data,
  );

  console.log(
    "DEBUG ASSIGNMENT ERROR",
    error,
  );

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const assignment =
    data as MissionAssignment;

  const {
    data: mission,
    error: missionError,
  } = await supabase
    .from("missions")
    .select(
      "id, mission_text",
    )
    .eq(
      "id",
      assignment.mission_id,
    )
    .single();

  console.log(
    "DEBUG MISSION RESPONSE",
    mission,
  );

  console.log(
    "DEBUG MISSION ERROR",
    missionError,
  );

  if (missionError) {
    throw missionError;
  }

  return {
    id: mission.id,
    text: mission.mission_text,
  };
}

/**
 * Creates or retrieves a secret mission.
 */
export async function getOrCreateSecretMission(
  eventId: string,
  participantId: string,
): Promise<SecretMission> {
  console.log(
    "DEBUG SECRET MISSION INPUT",
    {
      eventId,
      participantId,
    },
  );

  /*
   * First check whether this participant
   * already has an assignment.
   */
  const existing =
    await getExistingAssignment(
      eventId,
      participantId,
    );

  if (existing) {
    console.log(
      "DEBUG EXISTING MISSION FOUND",
      existing,
    );

    return existing;
  }

  /*
   * Load missions already used in this event.
   */
  const {
    data: usedAssignments,
    error: usedError,
  } = await supabase
    .from("mission_assignments")
    .select(
      "mission_id",
    )
    .eq(
      "event_id",
      eventId,
    );

  if (usedError) {
    throw usedError;
  }

  const usedMissionIds =
    usedAssignments?.map(
      (item: { mission_id: string }) =>
        item.mission_id,
    ) ?? [];

  console.log(
    "DEBUG USED MISSION IDS",
    usedMissionIds,
  );

  /*
   * Load all active Secret Missions.
   *
   * IMPORTANT:
   * The canonical activity ID in the
   * database is "secretMission".
   */
  const {
    data: missions,
    error: missionsError,
  } = await supabase
    .from("missions")
    .select(
      "id, mission_text",
    )
    .eq(
      "activity_id",
      "secretMission",
    )
    .eq(
      "stage_id",
      "opening",
    )
    .eq(
      "is_active",
      true,
    )
    .order(
      "mission_order",
      {
        ascending: true,
      },
    );

  console.log(
    "DEBUG AVAILABLE MISSIONS",
    missions,
  );

  console.log(
    "DEBUG MISSIONS ERROR",
    missionsError,
  );

  if (missionsError) {
    throw missionsError;
  }

  const availableMissions =
    (missions as Mission[]).filter(
      (mission) =>
        !usedMissionIds.includes(
          mission.id,
        ),
    );

  console.log(
    "DEBUG AVAILABLE UNUSED MISSIONS",
    availableMissions,
  );

  const mission =
    availableMissions[0];

  if (!mission) {
    throw new Error(
      "No available secret missions for this event.",
    );
  }

  /*
   * IMPORTANT DIAGNOSTIC:
   *
   * Verify that participantId refers
   * to the event_participants.id row,
   * and verify that the row belongs to
   * the currently authenticated user.
   */
  const {
    data: participantRow,
    error: participantLookupError,
  } = await supabase
    .from("event_participants")
    .select(
      "id, event_id, participant_id, display_name",
    )
    .eq(
      "id",
      participantId,
    )
    .single();

  console.log(
    "DEBUG PARTICIPANT ROW BEFORE ASSIGNMENT",
    participantRow,
  );

  console.log(
    "DEBUG PARTICIPANT LOOKUP ERROR",
    participantLookupError,
  );

  if (participantLookupError) {
    throw participantLookupError;
  }

  /*
   * Verify the authenticated user again
   * immediately before the RLS-protected
   * insert.
   */
  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  console.log(
    "DEBUG AUTH UID BEFORE ASSIGNMENT",
    user?.id,
  );

  console.log(
    "DEBUG RLS EXPECTATION",
    {
      participantRowId:
        participantRow?.id,

      participantRowEventId:
        participantRow?.event_id,

      participantRowAuthId:
        participantRow?.participant_id,

      currentAuthId:
        user?.id,

      eventId,

      participantId,
    },
  );

  /*
   * Create the assignment.
   */
  const {
    data: assignment,
    error: insertError,
  } = await supabase
    .from(
      "mission_assignments",
    )
    .insert({
      event_id: eventId,
      participant_id: participantId,
      mission_id: mission.id,
    })
    .select(
      "id, mission_id",
    )
    .single();

  console.log(
    "DEBUG ASSIGNMENT INSERT RESPONSE",
    assignment,
  );

  console.log(
    "DEBUG ASSIGNMENT INSERT ERROR",
    insertError,
  );

  if (insertError) {
    throw insertError;
  }

  console.log(
    "DEBUG SECRET MISSION CREATED",
    {
      assignmentId:
        assignment?.id,
      missionId:
        mission.id,
      participantId,
      eventId,
    },
  );

  return {
    id: mission.id,
    text: mission.mission_text,
  };
}
