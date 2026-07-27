import { Text } from "@/components/ui";

interface ConversationCardProps {
  /**
   * Current Conversation Journey chapter.
   */
  chapter: number;

  /**
   * Current stage title.
   */
  stageTitle: string;

  /**
   * Shared prompt.
   */
  question: string;
}

export function ConversationCard({
  chapter,
  stageTitle,
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
          text-xs
          uppercase
          tracking-[0.30em]
          text-white/45
        "
      >
        Conversation Journey
      </Text>

      <Text
        className="
          mt-3
          text-lg
          font-medium
          text-emerald-300
        "
      >
        Chapter {chapter} · {stageTitle}
      </Text>

      <div
        key={stageTitle}
        className="fade-up"
      >
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
      </div>
    </section>
  );
}
