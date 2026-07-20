import { Container } from "@/components/layout";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div
        className="
          absolute
          left-16
          top-16
          h-96
          w-96
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      <Container>
        <div className="relative max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tight text-slate-50 md:text-6xl">
            Every conversation
            <br />
            starts somewhere.
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-slate-400">
            One thoughtful question is enough.
          </p>
        </div>
      </Container>
    </section>
  );
}
