import { supabase } from "../supabase";
import type { Event } from "./event.types";

export async function getEventByCode(
  code: string
): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("code", code)
    .single();

  if (error) {
    throw error;
  }

  return data as Event;
}
