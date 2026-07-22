import { Text } from "@/components/ui";

interface MeetingTimerProps {
  time: string;
}

export function MeetingTimer({
  time,
}: MeetingTimerProps) {
  return (
    <div className="mt-10 text-center">
      <Text className="text-sm uppercase tracking-[0.25em] text-white/40">
        Time Remaining
      </Text>

      <Text className="mt-2 text-5xl font-light">
        {time}
      </Text>
    </div>
  );
}
