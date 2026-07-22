import { Text } from "@/components/ui";

interface MeetingTimerProps {
  time: string;
  remainingSeconds: number;
}

export function MeetingTimer({
  time,
  remainingSeconds,
}: MeetingTimerProps) {
  const timerColor =
    remainingSeconds <= 10
      ? "text-red-400"
      : remainingSeconds <= 60
      ? "text-amber-300"
      : "text-white";

  return (
    <div className="mt-10 text-center">
      <Text
        className="
          text-sm
          uppercase
          tracking-[0.2em]
          text-white/40
        "
      >
        Time Remaining
      </Text>

      <Text
        className={`mt-2 text-5xl font-light ${timerColor}`}
      >
        {time}
      </Text>
    </div>
  );
}
