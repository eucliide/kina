import { Button } from "@/components/ui";

type ParticipantCardProps = {
  name: string;
  status?: "available" | "pending";
  onInvite?: () => void;
};

export function ParticipantCard({
  name,
  status = "available",
  onInvite,
}: ParticipantCardProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-5
      "
    >
      <div>
        <h3 className="font-medium text-white">
          {name}
        </h3>

        <p className="mt-1 text-sm text-white/50">
          {status === "available"
            ? "Available"
            : "Invitation pending"}
        </p>
      </div>

      <Button onClick={onInvite}>
        Invite
      </Button>
    </div>
  );
}
