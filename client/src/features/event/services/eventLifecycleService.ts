import { supabase } from "@/lib/supabase";

/**
 * Ends an event, marking it as completed.
 * 
 * Only the event host can end an event.
 * This is enforced by RLS policies on the database.
 */
export async function endEvent(eventId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("events")
    .update({ stage: "completed" })
    .eq("id", eventId)
    .eq("host_id", user.id);

  if (error) {
    console.error("Failed to end event:", error);
    return false;
  }

  return true;
}

/**
 * Starts an event, transitioning from waiting to activity.
 * 
 * Only the event host can start an event.
 */
export async function startEvent(eventId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("events")
    .update({ stage: "activity" })
    .eq("id", eventId)
    .eq("host_id", user.id)
    .eq("stage", "waiting");

  if (error) {
    console.error("Failed to start event:", error);
    return false;
  }

  return true;
}
