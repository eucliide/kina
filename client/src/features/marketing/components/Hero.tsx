import { Container } from "@/components/layout";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div
        className="
          absolute
          left-24
          top-20
          h-80
          w-80
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      <Container>
        <div className="relative max-w-2xl">
          <p className="text-5xl font-semibold tracking-tight text-slate-50 md:text-6xl">
            Every conversation
            <br />
            starts somewhere.
          </p>

          <p className="mt-8 max-w-lg text-lg leading-8 text-slate-400">
            One thoughtful question is enough.
          </p>
        </div>
      </Container>
    </section>
  );
}
