import type { Participant } from "../types";

/**
 * Temporary participants used during
 * development.
 *
 * Later these will come from Supabase
 * Presence.
 */
export const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: "1",
    name: "Sarah",
    status: "available",
  },
  {
    id: "2",
    name: "Kevin",
    status: "available",
  },
  {
    id: "3",
    name: "Emma",
    status: "meeting",
  },
  {
    id: "4",
    name: "James",
    status: "available",
  },
];
