import { Container } from "@/components/layout";
import { Button, Heading, Text } from "@/components/ui";

import { SecretMissionCard } from "../components/SecretMissionCard";
import { useSecretMission } from "../hooks/useSecretMission";

interface SecretMissionPageProps {
  onContinue: () => void;
}

export function SecretMissionPage({
  onContinue,
}: SecretMissionPageProps) {
  const {
    mission,
    loading,
    error,
  } = useSecretMission();

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <section
          className="
            flex
            min-h-screen
            flex-col
            justify-center
            py-12
          "
        >
          <Heading>
            One secret for tonight
          </Heading>

          <Text className="mt-3 max-w-md text-white/60">
            This is yours alone. Keep it
            quiet and let the evening unfold
            naturally.
          </Text>

          <div className="mt-8">
            {loading && (
              <Text className="text-white/50">
                Preparing your mission...
              </Text>
            )}

            {error && (
              <Text className="text-red-300">
                {error}
              </Text>
            )}

            {mission && (
              <SecretMissionCard
                mission={mission.text}
              />
            )}
          </div>

          <div className="mt-8 max-w-xl">
            <Button
              className="w-full sm:w-auto"
              onClick={onContinue}
              disabled={
                loading || !mission
              }
            >
              Keep it secret
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
