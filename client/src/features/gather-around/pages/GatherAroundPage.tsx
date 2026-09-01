import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";
import { Button, Heading, Text } from "@/components/ui";
import { PageEnter } from "@/lib/motion";

export function GatherAroundPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <PageEnter>
          <section className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center py-12 text-center sm:py-16">
            <Heading>
              Gather around.
            </Heading>

            <Text className="mt-4 max-w-sm">
              Come back together.
              The next part is for everyone.
            </Text>

            <Button
              variant="ghost"
              className="mt-8 sm:mt-10"
              onClick={() => navigate("/tabletopics")}
            >
              Ready
            </Button>
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}
