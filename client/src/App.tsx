import { Container, Section } from "@/components/layout";
import {
  Badge,
  Button,
  Card,
  Heading,
  Text,
} from "@/components/ui";

function App() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Section>
        <Container>
          <div className="mx-auto flex max-w-2xl items-center justify-center">
            <Card>
              <Badge>Round 1 • 10 minutes</Badge>

              <div className="mt-6">
                <Heading>What's your perfect weekend?</Heading>
              </div>

              <Text>
                Take a few minutes to get to know your partner. Listen with
                curiosity, ask follow-up questions, and let the conversation
                flow naturally.
              </Text>

              <div className="mt-8 flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  Partner: <span className="font-medium text-slate-300">John</span>
                </div>

                <Button>Start Conversation</Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}

export default App;
