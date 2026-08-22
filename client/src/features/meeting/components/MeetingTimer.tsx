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
    <div className="mt-8 text-center">
      <Label>Time remaining</Label>

      <p
        className={[
          "mt-2 text-3xl font-light tabular-nums transition-colors duration-300",
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
