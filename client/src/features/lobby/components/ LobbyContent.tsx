import { InvitationRequestCard } from "./InvitationRequestCard";
import { InvitationSentCard } from "./InvitationSentCard";
import { ParticipantRow } from "./ParticipantRow";
import { WaitingCard } from "./WaitingCard";

import type {
  LobbyState,
  Participant,
} from "../types";

interface LobbyContentProps {
  state: LobbyState;
  participants: Participant[];
  selectedParticipant: string;

  sendInvitation: (name: string) => void;
  cancelInvitation: () => void;
  acceptInvitation: () => void;
  declineInvitation: () => void;
}

export function LobbyContent({
  state,
  participants,
  selectedParticipant,
  sendInvitation,
  cancelInvitation,
}: LobbyContentProps) {
  switch (state) {
    case "waiting":
      return <WaitingCard />;

    case "available":
      return (
        <div className="mt-10 max-w-xl space-y-3">
          {participants.map((participant) => (
            <ParticipantRow
              key={participant.id}
              name={participant.name}
              status={participant.status}
              onClick={() =>
                participant.status === "available" &&
                sendInvitation(participant.name)
              }
            />
          ))}
        </div>
      );

    case "sent":
      return (
        <InvitationSentCard
          participantName={selectedParticipant}
          onCancel={cancelInvitation}
        />
      );

    case "received":
      return (
        <InvitationRequestCard
          participantName="John"
          onAccept={acceptInvitation}
          onDecline={declineInvitation}
        />
      );

    default:
      return null;
  }
}
