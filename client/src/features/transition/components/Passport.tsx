import { Heading, Text } from "@/components/ui";

interface PassportProps {
  partnerName: string;

  activityName: string;
}

export function Passport({
  activityName,
}: PassportProps) {
  return (
    <section
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#07111f]
        text-white
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-10
          backdrop-blur
        "
      >
        <Text className="uppercase tracking-[0.25em] text-white/40">
          Conversation Passport
        </Text>

        <Heading className="mt-4">
          {activityName}
        </Heading>

        <Text className="mt-8 text-white/60">
          Your next partner is about to be revealed.
        </Text>

        <Text className="mt-4 text-emerald-300">
          Get ready to continue your journey.
        </Text>
      </div>
    </section>
  );
}
