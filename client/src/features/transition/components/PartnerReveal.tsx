import { Heading, Text } from "@/components/ui";

interface PartnerRevealProps {
  partnerName: string;
}

export function PartnerReveal({
  partnerName,
}: PartnerRevealProps) {
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
      <div className="text-center">
        <Text className="uppercase tracking-[0.25em] text-white/40">
          Your Next Partner
        </Text>

        <Heading className="mt-6">
          {partnerName}
        </Heading>

        <Text className="mt-6 text-white/60">
          Continue your Conversation Journey.
        </Text>
      </div>
    </section>
  );
}
