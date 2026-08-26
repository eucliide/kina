import { Link } from "react-router-dom";

import { Container } from "@/components/layout";

export function Navigation() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <Container>
        <nav className="flex h-20 items-center">
          <a
            href="/"
            className="text-base font-medium tracking-tight text-white/80 transition-colors hover:text-white"
          >
            Kina
          </a>
        </nav>
      </Container>
    </header>
  );
}
