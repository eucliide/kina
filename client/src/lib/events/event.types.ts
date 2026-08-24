export interface Event {
  id: string;
  code: string;
  name: string;
  host_id: string;
  stage: "waiting" | "activity" | "completed";
  current_activity_id: string | null;
  current_round: number | null;
  round_started_at: string | null;
  round_ends_at: string | null;
  created_at: string;
}
