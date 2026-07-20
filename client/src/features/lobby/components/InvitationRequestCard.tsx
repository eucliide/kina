import { Button, Text } from "@/components/ui";

export function InvitationRequestCard() {
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
      <Text className="font-medium text-white">
        John would like to talk with you.
      </Text>

      <Text className="mt-3 text-sm text-white/60">
        Accept the invitation to begin the conversation or decline to return to
        the lobby.
      </Text>

      <div className="mt-6 flex gap-3">
        <Button>
          Accept
        </Button>

        <Button variant="secondary">
          Decline
        </Button>
      </div>
    </div>
  );
}
