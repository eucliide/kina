import { Text } from "@/components/ui";

interface MeetingTimerProps {
  time: string;
}

export function MeetingTimer({
  time,
}: MeetingTimerProps) {
  return (
    <Text className="text-center text-xl font-medium text-white/80">
      {time}
    </Text>
  );
}
