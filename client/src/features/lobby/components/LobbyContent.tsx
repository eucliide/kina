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

  incomingInvitation: {
    id: string;
    senderId: string;
    senderName: string;
  } | null;

  sendInvitation: (
    participant: Participant,
  ) => void;

  cancelInvitation: () => void;
  acceptInvitation: () => void;
  declineInvitation: () => void;
}

export function LobbyContent({
  state,
  participants,
  selectedParticipant,
  incomingInvitation,
  sendInvitation,
  cancelInvitation,
  acceptInvitation,
  declineInvitation,
}: LobbyContentProps) {
  switch (state) {
    case "waiting":
      return <WaitingCard />;

    case "available":
      return (
        <div className="mt-10 max-w-xl space-y-3">
          {participants.map(
            (participant) => (
              <ParticipantRow
                key={participant.id}
                name={participant.name}
                status={
                  participant.status
                }
                onClick={() => {
                  if (
                    participant.status !==
                    "available"
                  ) {
                    return;
                  }

                  sendInvitation(
                    participant,
                  );
                }}
              />
            ),
          )}
        </div>
      );

    case "sent":
      return (
        <InvitationSentCard
          participantName={
            selectedParticipant
          }
          onCancel={
            cancelInvitation
          }
        />
      );

    case "received":
      if (!incomingInvitation) {
        return null;
      }

      return (
        <InvitationRequestCard
          participantName={
            incomingInvitation.senderName
          }
          onAccept={
            acceptInvitation
          }
          onDecline={
            declineInvitation
          }
        />
      );

    default:
      return null;
  }
}
