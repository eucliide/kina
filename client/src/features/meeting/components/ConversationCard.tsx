import { Text } from "@/components/ui";
import { RoundIndicator } from "./RoundIndicator";

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
      p-12
      backdrop-blur
      transition-all
      duration-500
      "
    >
      <Text
        className="
          text-sm
          uppercase
          tracking-[0.2em]
          text-white/40
        "
      >
      <RoundIndicator
        round={round}
      />
        Round {round}
      </Text>

      <Text
        className="
          mt-8
          text-3xl
          leading-relaxed
          text-white
        "
      >
        {question}
      </Text>
    </section>
  );
}
