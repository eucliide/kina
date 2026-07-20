import { PresenceDot } from "@/components/ui";

interface ParticipantRowProps {
  name: string;
  status: "available" | "busy";
  onClick?: () => void;
}

export function ParticipantRow({
  name,
  status,
  onClick,
}: ParticipantRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-5
        py-4
        text-left
        transition-colors
        hover:bg-white/10
      "
    >
      <PresenceDot status={status} />

      <div>
        <Text className="font-medium text-white">
          {name}
        </Text>

        <Text className="mt-1 text-sm text-white/50">
          {status === "available"
            ? "Available"
            : "In conversation"}
        </Text>
      </div>
    </button>
  );
}
