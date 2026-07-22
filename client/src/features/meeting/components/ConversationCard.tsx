import { Text } from "@/components/ui";

interface ConversationCardProps {
  round: number;
  question: string;
}

export function ConversationCard({
  round,
  question,
}: ConversationCardProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-14
        backdrop-blur
      "
    >
      <Text className="uppercase tracking-[0.2em] text-white/40">
        Round {round}
      </Text>

      <Text className="mt-8 text-4xl leading-relaxed text-white">
        {question}
      </Text>
    </section>
  );
}
