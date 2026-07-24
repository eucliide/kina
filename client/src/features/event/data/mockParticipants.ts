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
    meetingsCompleted: 0,
    waitCount: 0,
    metParticipantIds: [],
  },
  {
    id: "2",
    name: "Kevin",
    status: "available",
    meetingsCompleted: 0,
    waitCount: 0,
    metParticipantIds: [],
  },
  {
    id: "3",
    name: "Emma",
    status: "meeting",
    meetingsCompleted: 0,
    waitCount: 0,
    metParticipantIds: [],
  },
  {
    id: "4",
    name: "James",
    status: "available",
    meetingsCompleted: 0,
    waitCount: 0,
    metParticipantIds: [],
  },
];
