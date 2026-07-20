import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";

import { LobbyContent } from "../components/LobbyContent";
import { useLobbyState } from "../hooks/useLobbyState";

export function LobbyPage() {
  const {
    state,
    participants,
    selectedParticipant,

    sendInvitation,
    cancelInvitation,

    acceptInvitation,
    declineInvitation,
  } = useLobbyState();

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <section className="flex min-h-screen flex-col justify-center">
          <Heading>
            Choose a partner
          </Heading>

          <Text className="mt-3 max-w-md text-white/60">
            Invite someone to begin a conversation.
          </Text>

          <LobbyContent
            state={state}
            participants={participants}
            selectedParticipant={selectedParticipant}
            sendInvitation={sendInvitation}
            cancelInvitation={cancelInvitation}
            acceptInvitation={acceptInvitation}
            declineInvitation={declineInvitation}
          />
        </section>
      </Container>
    </main>
  );
}
