import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";

import { useSecretMission } from "../hooks/useSecretMission";

export function SecretMissionPage() {
  const {
    mission,
    loading,
    error,
  } = useSecretMission();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07111f] text-white">
        <Container>
          <section className="flex min-h-screen items-center justify-center">
            <Text className="text-white/60">
              Preparing your secret mission...
            </Text>
          </section>
        </Container>
      </main>
    );
  }

  if (error || !mission) {
    return (
      <main className="min-h-screen bg-[#07111f] text-white">
        <Container>
          <section className="flex min-h-screen flex-col justify-center">
            <Heading>
              Secret Mission
            </Heading>

            <Text className="mt-3 max-w-md text-white/60">
              {error ??
                "Unable to prepare your secret mission."}
            </Text>
          </section>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <section className="flex min-h-screen flex-col justify-center">
          <Heading>
            Your Secret Mission
          </Heading>

          <Text className="mt-4 max-w-md text-white/70">
            This is yours alone.
            Keep it quiet and let the evening
            unfold naturally.
          </Text>

          <div
            className="
              mt-8
              max-w-xl
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-6
              text-lg
              leading-relaxed
            "
          >
            {mission.text}
          </div>
        </section>
      </Container>
    </main>
  );
}
