import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";

import { WaitingCard } from "../components/WaitingCard";

export function LobbyPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <section className="flex min-h-screen flex-col justify-center">

          <Heading>
            You're in
          </Heading>

          <Text className="mt-3 max-w-md text-white/60">
            Take a moment while everyone joins the meetup.
          </Text>

          <WaitingCard />

          <div className="mt-10 max-w-md">
            <Text className="mb-4 text-sm uppercase tracking-[0.2em] text-white/40">
              Participants
            </Text>

            <div className="space-y-3">

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                John
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                Sarah
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                Kevin
              </div>

            </div>
          </div>

        </section>
      </Container>
    </main>
  );
}
