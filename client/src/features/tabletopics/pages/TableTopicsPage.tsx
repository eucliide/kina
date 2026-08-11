import { Container } from "@/components/layout";
import { Button, Heading, Text } from "@/components/ui";

export function TableTopicsPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <section
          className="
            mx-auto
            flex
            min-h-screen
            max-w-2xl
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          <Text className="uppercase tracking-[0.2em] text-white/40">
            TableTopics
          </Text>

          <Heading className="mt-4">
            One table. One conversation.
          </Heading>

          <Text className="mt-5 max-w-md text-white/60">
            Come together, take a seat, and let the conversation unfold.
          </Text>

          <Button className="mt-10">
            Begin
          </Button>
        </section>
      </Container>
    </main>
  );
}
