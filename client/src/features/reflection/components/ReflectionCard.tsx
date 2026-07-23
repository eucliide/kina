import { Heading, Text } from "@/components/ui";

interface ReflectionCardProps {
  partnerName: string;
  prompt: string;
}

export function ReflectionCard({
  partnerName,
  prompt,
}: ReflectionCardProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-10
        text-center
      "
    >
      <Text className="uppercase tracking-[0.2em] text-white/40">
        Conversation Complete
      </Text>

      <Heading className="mt-4">
          Before you go...
      </Heading>

      <Text className="mt-6 text-white/60">
           here's one last
           invitation to continue the conversation
              with {partnerName}
      </Text>
      <div
        className="
          mt-10
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-8
          py-7
        "
      >
        <Text
          className="
            text-lg
            leading-relaxed
            text-white
          "
        >
          {prompt}
        </Text>
      </div>
    </section>
  );
}
