import { supabase } from "../supabase";
import type { Event } from "./event.types";

/**
 * Validates if an event can be joined.
 * 
 * An event is joinable if:
 * - It exists
 * - It is in "waiting" or "activity" stage
 * - It has not been completed
 */
async function isEventJoinable(event: Event): Promise<boolean> {
  return event.stage === "waiting" || event.stage === "activity";
}

export async function getEventByCode(
  code: string
): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("code", code)
    .single();

  if (error) {
    throw new Error("Event not found");
  }

  const event = data as Event;

  // Validate event is joinable
  const joinable = await isEventJoinable(event);
  
  if (!joinable) {
    throw new Error("This gathering has ended");
  }

  return event;
}
