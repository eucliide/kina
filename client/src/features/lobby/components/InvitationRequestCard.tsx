import { Button, Text } from "@/components/ui";

interface InvitationRequestCardProps {
  participantName: string;
}

export function InvitationRequestCard({
  participantName,
}: InvitationRequestCardProps) {
  return (
    <div
      className="
        mt-10
        w-full
        max-w-md
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
      "
    >
      <Text className="text-sm uppercase tracking-[0.2em] text-white/40">
        Conversation request
      </Text>

      <Text className="mt-4 font-medium text-white">
        {participantName} would like to talk with you.
      </Text>

      <Text className="mt-3 text-sm text-white/60">
        Accept to begin your conversation or decline to return to the lobby.
      </Text>

      <div className="mt-6 flex gap-3">
        <Button className="flex-1">
          Accept
        </Button>

        <Button
          className="
            flex-1
            bg-white/10
            hover:bg-white/15
            focus:ring-white/20
          "
        >
          Decline
        </Button>
      </div>
    </div>
  );
}
