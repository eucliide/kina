import { Text } from "@/components/ui";

export function WaitingCard() {
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
        <span className="h-2 w-2 rounded-full bg-emerald-400" />

        <Text className="font-medium text-white">
          Waiting for participants
        </Text>
      </div>

      <Text className="mt-3 text-sm text-white/60">
        The meetup will begin automatically when everyone is ready.
      </Text>
    </div>
  );
}
