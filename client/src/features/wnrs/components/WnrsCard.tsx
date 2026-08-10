import { Heading, Text } from "@/components/ui";

import type { WnrsPrompt } from "../types/wnrs";

interface WnrsCardProps {
  prompt: WnrsPrompt;
}

export function WnrsCard({
  prompt,
}: WnrsCardProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-8
        shadow-2xl
        backdrop-blur
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
        Shared Reflection
      </Text>

      <Heading className="mt-4">
        Take a moment together.
      </Heading>

      <Text
        className="
          mt-6
          text-xl
          leading-relaxed
          text-white/85
        "
      >
        {prompt.text}
      </Text>

      <Text
        className="
          mt-6
          text-sm
          leading-relaxed
          text-white/45
        "
      >
        There is no right answer.
        Listen, share, and let the
        conversation unfold.
      </Text>
    </section>
  );
}
