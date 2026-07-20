import { Container } from "@/components/layout";
import { Button } from "@/components/ui";

export function Navigation() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <a
            href="/"
            className="
              text-lg
              font-medium
              tracking-tight
              text-slate-100
              transition-colors
              hover:text-white
            "
          >
            Kina
          </a>

          <Button>
            Join Meetup
          </Button>
        </nav>
      </Container>
    </header>
  );
}
