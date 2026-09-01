import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";
import { Button, Heading, Text } from "@/components/ui";
import { PageEnter } from "@/lib/motion";
import { getJoinedEvent } from "@/features/join/services/joinSession";

export function ParticipationChoicePage() {
  const navigate = useNavigate();
  const event = getJoinedEvent();

  useEffect(() => {
    if (!event) {
      navigate("/create");
    }
  }, [event, navigate]);

  if (!event) {
    return null;
  }

  function handleJoining() {
    navigate("/create/name");
  }

  function handleHosting() {
    navigate("/lobby");
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <PageEnter>
          <section className="flex min-h-screen flex-col items-center justify-center py-12 sm:py-16">
            <div className="w-full max-w-md space-y-6 text-center sm:space-y-8">
              <div className="space-y-2 sm:space-y-3">
                <Heading>Are you joining the conversation?</Heading>
                <Text className="text-white/60">
                  Choose how you'll participate in {event.name}
                </Text>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                <Button className="w-full py-3 sm:py-3.5" onClick={handleJoining}>
                  Yes, I'm joining
                </Button>

                <Button
                  variant="ghost"
                  className="w-full py-3 sm:py-3.5"
                  onClick={handleHosting}
                >
                  No, I'm hosting
                </Button>
              </div>
            </div>
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}
