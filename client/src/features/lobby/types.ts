export type LobbyState =
  | "waiting"
  | "available"
  | "sent"
  | "received";

export type PresenceStatus =
  | "available"
  | "inConversation";

export interface Participant {
  id: string;
  name: string;
  status: PresenceStatus;
}
