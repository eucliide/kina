import { motion, AnimatePresence } from "framer-motion";

import { InvitationRequestCard } from "./InvitationRequestCard";
import { InvitationSentCard } from "./InvitationSentCard";
import { ParticipantRow } from "./ParticipantRow";
import { WaitingCard } from "./WaitingCard";
import { contentSwap } from "@/lib/motion";

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
  return (
    <AnimatePresence mode="wait">
      {state === "waiting" && (
        <motion.div
          key="waiting"
          variants={contentSwap}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <WaitingCard />
        </motion.div>
      )}

      {state === "available" && (
        <motion.div
          key="available"
          variants={contentSwap}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mt-10 max-w-xl space-y-3"
        >
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
        </motion.div>
      )}

      {state === "sent" && (
        <motion.div
          key="sent"
          variants={contentSwap}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <InvitationSentCard
            participantName={
              selectedParticipant
            }
            onCancel={
              cancelInvitation
            }
          />
        </motion.div>
      )}

      {state === "received" && incomingInvitation && (
        <motion.div
          key="received"
          variants={contentSwap}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
