import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout";
import { Button, Label, Text } from "@/components/ui";
import { PageEnter } from "@/lib/motion";

import { useSecretMission } from "../hooks/useSecretMission";

export function SecretMissionPage() {
  const navigate = useNavigate();

  const { mission, loading, error } = useSecretMission();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07111f] text-white">
        <Container>
          <section className="flex min-h-screen items-center justify-center">
            <Text className="text-white/40">
              One moment…
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
            <Text className="text-white/50">
              {error ?? "Unable to prepare your mission."}
            </Text>
          </section>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Container>
        <PageEnter>
          <section className="flex min-h-screen flex-col justify-center">
            <div className="max-w-md">
              <Label>Just for you</Label>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                <Text className="text-lg leading-relaxed text-white">
                  {mission.text}
                </Text>

                <Text className="mt-4 text-sm text-white/40">
                  Keep this to yourself.
                </Text>
              </div>

              <Button
                variant="ghost"
                className="mt-6"
                onClick={() => navigate("/lobby")}
              >
                Enter the lobby
              </Button>
            </div>
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}
