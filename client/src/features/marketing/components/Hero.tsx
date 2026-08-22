import { Container } from "@/components/layout";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center">
      <Container>
        <div className="relative max-w-xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Every conversation
            <br />
            starts somewhere.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-white/50">
            One thoughtful question is enough.
          </p>
        </div>
      </Container>
    </section>
  );
}
