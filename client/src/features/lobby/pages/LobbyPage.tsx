import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";

import { WaitingCard } from "../components/WaitingCard";
import { ParticipantRow } from "../components/ParticipantRow";
import { InvitationSentCard } from "../components/InvitationSentCard";
import { InvitationRequestCard } from "../components/InvitationRequestCard";

type LobbyState =
  | "waiting"
  | "available"
  | "sent"
  | "received";

export function LobbyPage() {
  // Temporary state for Sprint 3.6.
  // This will eventually come from Supabase Realtime.
  const state: LobbyState = "available";

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
            <div className="mt-10 max-w-xl space-y-3">
              <ParticipantRow
                  name="Sarah"
                  status="available"
                  onClick={() => setState("sent")}
              />

              <ParticipantRow
                name="Kevin"
                status="available"
              />

              <ParticipantRow
                name="Alice"
                status="busy"
              />
            </div>
          )}

          {state === "sent" && (
            <InvitationSentCard participantName="Sarah" />
          )}

          {state === "received" && (
            <InvitationRequestCard participantName="John" />
          )}
        </section>
      </Container>
    </main>
  );
}
