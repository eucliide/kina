import { Heading, Text } from "@/components/ui";

interface MeetingHeaderProps {
  partnerName: string;
}

export function MeetingHeader({
  partnerName,
}: MeetingHeaderProps) {
  return (
    <header className="mb-12 text-center">
      <Text className="uppercase tracking-[0.25em] text-white/40">
        Your Partner
      </Text>

      <Heading className="mt-4">
        {partnerName}
      </Heading>
    </header>
  );
}
