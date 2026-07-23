import { Text } from "@/components/ui";

interface MeetingTimerProps {
  time: string;
  remainingSeconds: number;
}

export function MeetingTimer({
  time,
  remainingSeconds,
}: MeetingTimerProps) {
  const warning =
    remainingSeconds <= 60;

  const critical =
    remainingSeconds <= 10;

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

      <div
        className={`
          mt-2
          transition-transform
          duration-300
          ${
            critical
              ? "scale-[1.02]"
              : ""
          }
        `}
      >
        <Text
          className={`
            text-5xl
            transition-all
            duration-300
            ${
              warning
                ? "font-normal text-white/95"
                : "font-light text-white"
            }
          `}
        >
          {time}
        </Text>
      </div>
    </div>
  );
}
