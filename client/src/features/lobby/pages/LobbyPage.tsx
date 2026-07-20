import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";

import { WaitingCard } from "../components/WaitingCard";
import { ParticipantCard } from "../components/ParticipantCard";
import { InvitationSentCard } from "../components/InvitationSentCard";
import { InvitationRequestCard } from "../components/InvitationRequestCard";

export function LobbyPage() {
  // Temporary state for Sprint 3.6.
  // This will eventually come from Supabase Realtime.
  const state = "available";

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <section className="flex min-h-screen flex-col justify-center">
          <Heading>Choose a partner</Heading>

          <Text className="mt-3 max-w-md text-white/60">
            Invite someone to begin a conversation.
          </Text>

          {state === "waiting" && <WaitingCard />}

          {state === "available" && (
            <div className="mt-10 max-w-xl space-y-4">
              <ParticipantCard name="Sarah" />
              <ParticipantCard name="Kevin" />
              <ParticipantCard name="Alice" />
            </div>
          )}

          {state === "sent" && <InvitationSentCard />}

          {state === "received" && <InvitationRequestCard />}
        </section>
      </Container>
    </main>
  );
}
