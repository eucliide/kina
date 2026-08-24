import { supabase } from "../supabase";
import type { Event } from "./event.types";

/**
 * Maximum age for an event before it's considered expired (in hours).
 */
const EVENT_EXPIRATION_HOURS = 48;

/**
 * Checks if an event has expired based on its creation time.
 */
function isEventExpired(event: Event): boolean {
  const createdAt = new Date(event.created_at);
  const now = new Date();
  const hoursSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
  
  // Don't expire active events
  if (event.stage === "activity") {
    return false;
  }
  
  return hoursSinceCreation > EVENT_EXPIRATION_HOURS;
}

/**
 * Validates if an event can be joined.
 * 
 * An event is joinable if:
 * - It exists
 * - It is in "waiting" or "activity" stage
 * - It has not been completed
 * - It has not expired
 */
async function isEventJoinable(event: Event): Promise<boolean> {
  if (event.stage === "completed") {
    return false;
  }
  
  if (isEventExpired(event)) {
    return false;
  }
  
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

  if (error || !data) {
    throw new Error("Invalid gathering code");
  }

  const event = data as Event;

  // Validate event is joinable
  const joinable = await isEventJoinable(event);
  
  if (!joinable) {
    if (event.stage === "completed") {
      throw new Error("This gathering has ended");
    }
    throw new Error("This gathering is no longer available");
  }

  return event;
}
