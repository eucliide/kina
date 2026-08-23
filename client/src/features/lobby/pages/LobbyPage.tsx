import { Container } from "@/components/layout";
import { Heading, Label, Text } from "@/components/ui";
import { PageEnter } from "@/lib/motion";

import { getSession } from "@/features/meeting/services/meetingSession";
import { TOTAL_PARTNER_ROTATIONS } from "@/features/event/constants/event";

import { LobbyContent } from "../components/LobbyContent";
import { useLobbyState } from "../hooks/useLobbyState";

export function LobbyPage() {
  const {
    state,
    participants,
    selectedParticipant,

    sendInvitation,
    incomingInvitation,
    cancelInvitation,

    acceptInvitation,
    declineInvitation,
  } = useLobbyState();

  const session = getSession();
  const rotation = session
    ? Math.min(session.partnerRotation + 1, TOTAL_PARTNER_ROTATIONS)
    : 1;

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <PageEnter>
          <section className="flex min-h-screen flex-col justify-center">
            <div>
              <Label>
                Conversation {rotation} of {TOTAL_PARTNER_ROTATIONS}
              </Label>

              <Heading className="mt-3">
                Find someone to talk with.
              </Heading>

              <Text className="mt-2 max-w-sm">
                Tap a name to send an invitation.
              </Text>
            </div>

            <LobbyContent
              state={state}
              participants={participants}
              selectedParticipant={selectedParticipant}
              sendInvitation={sendInvitation}
              incomingInvitation={incomingInvitation}
              cancelInvitation={cancelInvitation}
              acceptInvitation={acceptInvitation}
              declineInvitation={declineInvitation}
            />
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}
