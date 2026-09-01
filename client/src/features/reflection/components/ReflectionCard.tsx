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
        p-6
        text-center
        sm:p-8
        lg:p-10
      "
    >
      <Text className="uppercase tracking-[0.2em] text-white/40">
        Conversation Complete
      </Text>

      <Heading className="mt-4">
          Before you go...
      </Heading>

      <Text className="mt-5 text-white/60 sm:mt-6">
           here's one last
           invitation to continue the conversation
              with {partnerName}
      </Text>
      <div
        className="
          mt-8
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-6
          py-6
          sm:mt-10
          sm:px-8
          sm:py-7
        "
      >
        <Text
          className="
            text-base
            leading-relaxed
            text-white
            sm:text-lg
          "
        >
          {prompt}
        </Text>
      </div>
    </section>
  );
}
