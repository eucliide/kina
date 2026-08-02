import { getEventByCode } from "@/lib/events/eventRepository";
import type { Event } from "@/lib/events/event.types";

/**
 * Loads a persisted event record by its join code.
 *
 * Returns the database row as-is.
 * Domain state initialisation is the caller's responsibility.
 */
export async function loadEventByCode(
  code: string,
): Promise<Event> {
  return getEventByCode(code);
}
