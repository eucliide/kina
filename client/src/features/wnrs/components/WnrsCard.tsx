import { Heading, Text } from "@/components/ui";

interface WnrsCardProps {
  prompt: string;
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
        bg-white/5
        p-10
        text-center
      "
    >
      <Text
        className="
          uppercase
          tracking-[0.2em]
          text-white/40
        "
      >
        One last thing
      </Text>

      <Heading className="mt-4">
        Share something real.
      </Heading>

      <Text
        className="
          mx-auto
          mt-4
          max-w-lg
          leading-relaxed
          text-white/60
        "
      >
        Take a moment with each other.
        Answer honestly, then give the
        other person space to share.
      </Text>

      <div
        className="
          mt-10
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-8
          py-8
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
