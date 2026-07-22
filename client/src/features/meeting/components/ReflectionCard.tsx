import { Text } from "@/components/ui";

interface ReflectionCardProps {
  remainingTime: string;
}

export function ReflectionCard({
  remainingTime,
}: ReflectionCardProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-12
        text-center
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
        Reflection
      </Text>

      <Text
        className="
          mt-8
          text-3xl
          leading-relaxed
          text-white
        "
      >
        Take a moment to think about
        what stood out from your conversation.
      </Text>

      <Text
        className="
          mt-10
          text-5xl
          font-light
          text-white
        "
      >
        {remainingTime}
      </Text>
    </section>
  );
}
