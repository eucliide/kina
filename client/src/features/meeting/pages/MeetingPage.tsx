import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";

import { ConversationCard } from "../components/ConversationCard";

export function MeetingPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <section className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-2xl">

            <Heading>
              Round 1
            </Heading>

            <Text className="mt-3 text-white/60">
              Find your partner and enjoy the conversation.
            </Text>

            <div className="mt-10">
              <ConversationCard />
            </div>

          </div>
        </section>
      </Container>
    </main>
  );
}
