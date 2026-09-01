import { Label } from "@/components/ui";

interface MeetingTimerProps {
  time: string;
  remainingSeconds: number;
}

export function MeetingTimer({
  time,
  remainingSeconds,
}: MeetingTimerProps) {
  const warning = remainingSeconds <= 60;
  const critical = remainingSeconds <= 10;

  return (
    <div className="mt-6 text-center sm:mt-8">
      <Label>Time remaining</Label>

      <p
        className={[
          "mt-2 text-2xl font-light tabular-nums transition-colors duration-300 sm:text-3xl",
          critical
            ? "text-white"
            : warning
              ? "text-white/80"
              : "text-white/40",
        ].join(" ")}
      >
        {time}
      </p>
    </div>
  );
}
