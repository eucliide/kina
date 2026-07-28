import { Text } from "@/components/ui";

interface ConversationPassportCardProps {
  rotation: number;

  totalRotations: number;

  currentChapter: number;
}

const CHAPTERS = [
  "Getting Comfortable",
  "Sharing Stories",
  "Discovering Values",
  "Looking Forward",
];

export function ConversationPassportCard({
  rotation,
  totalRotations,
  currentChapter,
}: ConversationPassportCardProps) {
  return (
    <aside
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur
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
          mt-2
          text-sm
          text-white/60
        "
      >
        Partner {rotation} of {totalRotations}
      </Text>

      <div className="mt-6 space-y-3">
        {CHAPTERS.map(
          (chapter, index) => {
            const number = index + 1;

            const completed =
              number < currentChapter;

            const active =
              number === currentChapter;

            return (
              <div
                key={chapter}
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span>
                  {completed
                    ? "✓"
                    : active
                    ? "●"
                    : "○"}
                </span>

                <Text
                  className={
                    completed
                      ? "text-white"
                      : active
                      ? "text-emerald-300"
                      : "text-white/45"
                  }
                >
                  {chapter}
                </Text>
              </div>
            );
          },
        )}
      </div>
    </aside>
  );
}
