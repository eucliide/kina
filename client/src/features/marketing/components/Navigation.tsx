import { Container } from "@/components/layout";
import { Button } from "@/components/ui/Button";

export function Navigation() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            Ki
          </h1>

          <Button>
            Join Meetup
          </Button>
        </nav>
      </Container>
    </header>
  );
}
