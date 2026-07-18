import { Container, Section } from "@/components/layout";
import { Badge, Button, Card } from "@/components/primitives";

function App() {
  return (
    <Section>
      <Container>
        <Card>
          <Badge>
            Round 1
          </Badge>

          <h1 className="mt-4 text-4xl font-semibold">
            What's your perfect weekend?
          </h1>

          <p className="mt-3 text-text-secondary">
            Talk naturally. No pressure.
          </p>

          <Button className="mt-6">
            Start Conversation
          </Button>
        </Card>
      </Container>
    </Section>
  );
}

export default App;
