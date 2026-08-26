import { Link } from "react-router-dom";

import { Container } from "@/components/layout";
import { Heading, Text } from "@/components/ui";
import { PageEnter } from "@/lib/motion";

import { JoinForm } from "../components/JoinForm";

export function JoinPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      {/* Navigation */}
      <header className="absolute inset-x-0 top-0 z-10">
        <Container>
          <nav className="flex h-20 items-center">
            <Link
              to="/"
              className="text-base font-medium tracking-tight text-white/80 transition-colors hover:text-white"
            >
              Kina
            </Link>
          </nav>
        </Container>
      </header>

      <Container>
        <PageEnter>
          <section className="flex min-h-screen flex-col justify-center">
            <Heading>Join a meetup</Heading>

            <Text className="mt-3 max-w-sm">
              Enter a meeting code to find your group.
            </Text>

            <div className="mt-8 max-w-sm">
              <JoinForm />
            </div>
          </section>
        </PageEnter>
      </Container>
    </main>
  );
}
