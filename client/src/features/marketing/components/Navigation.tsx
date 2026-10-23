import { Container } from "@/components/layout";
import { KinaLogo } from "@/components/ui/KinaLogo";

export function Navigation() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <Container>
        <nav className="flex h-20 items-center">
          <a href="/">
            <KinaLogo className="h-8 w-auto" />
          </a>
        </nav>
      </Container>
    </header>
  );
}
