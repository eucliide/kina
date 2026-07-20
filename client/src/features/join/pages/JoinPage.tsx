import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";
import { JoinForm } from "../components/JoinForm";

export function JoinPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <section className="flex min-h-screen flex-col justify-center">
          <Heading>
            Join a meetup
          </Heading>

          <Text className="mt-3 max-w-md text-white/60">
            Scan a QR code or enter a meeting code to join the conversation.
          </Text>

          <div className="mt-8">
            <JoinForm />
          </div>
        </section>
      </Container>
    </main>
  );
}
