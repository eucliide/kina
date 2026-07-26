import { Text } from "@/components/ui";

export interface PartnerRevealProps {
  partnerName: string;
}

/**
 * Displays the next
 * conversation partner.
 */
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
      "
    >
      <div className="text-center">
        <Text
          className="
            text-sm
            uppercase
            tracking-[0.3em]
            text-white/40
          "
        >
          Your Next Conversation is with :
        </Text>

        <Text
          className="
            mt-8
            text-6xl
            font-light
            text-white
          "
        >
          {partnerName}
        </Text>
      </div>
    </section>
  );
}
