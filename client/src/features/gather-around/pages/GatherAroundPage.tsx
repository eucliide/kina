import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";
import { Button, Heading, Text } from "@/components/ui";

export function GatherAroundPage() {
  const navigate = useNavigate();

  function continueToTableTopics() {
    navigate("/tabletopics");
  }

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
            Next up
          </Text>

          <Heading className="mt-4">
            Gather around.
          </Heading>

          <Text className="mt-5 max-w-md text-white/60">
            Come back together. The next part is for everyone.
          </Text>

          <Button
            className="mt-10"
            onClick={continueToTableTopics}
          >
            I’m ready
          </Button>
        </section>
      </Container>
    </main>
  );
}
