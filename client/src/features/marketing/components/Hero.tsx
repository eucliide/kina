import { Container } from "@/components/layout";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[36rem]
          w-[36rem]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <Container>
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-5xl font-semibold tracking-tight text-slate-50 sm:text-6xl">
            Better conversations.
          </p>

          <p className="mt-3 text-5xl font-semibold tracking-tight text-slate-300 sm:text-6xl">
            One question
            <br />
            at a time.
          </p>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
            Your phone starts the conversation.
            <br />
            You finish it.
          </p>

          <Button className="mt-12">
            Join Meetup
          </Button>
        </div>
      </Container>
    </section>
  );
}
