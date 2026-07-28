import { Text } from "@/components/ui";

export function ConversationComplete() {
  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-12
        text-center
        backdrop-blur
      "
    >
      <Text
        className="
          text-3xl
          font-semibold
          text-emerald-300
        "
      >
        ✓ Conversation Complete
      </Text>

      <Text
        className="
          mt-4
          text-white/60
        "
      >
        Preparing your next conversation…
      </Text>
    </section>
  );
}
