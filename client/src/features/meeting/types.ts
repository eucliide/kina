export interface MeetingSession {
  meetingId: string;

  participant: {
    id: string;
    name: string;
  };

  startedAt: Date;
}
