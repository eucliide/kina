type Presence = "available" | "busy";

interface PresenceDotProps {
  status: Presence;
}

export function PresenceDot({ status }: PresenceDotProps) {
  const isAvailable = status === "available";

  return (
    <span
      className={[
        "inline-block h-2.5 w-2.5 rounded-full",
        isAvailable
          ? "bg-emerald-400 animate-presence"
          : "bg-slate-400",
      ].join(" ")}
      aria-hidden="true"
    />
  );
}
