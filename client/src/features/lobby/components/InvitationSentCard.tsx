import { Text } from "@/components/ui";

export function InvitationSentCard() {
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
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-amber-400" />

        <Text className="font-medium text-white">
          Invitation sent
        </Text>
      </div>

      <Text className="mt-3 text-sm text-white/60">
        Waiting for the participant to accept your invitation.
      </Text>
    </div>
  );
}
