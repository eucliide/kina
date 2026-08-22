import { Text } from "@/components/ui";

export function WaitingCard() {
  return (
    <div className="mt-8 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400/70" />

        <Text className="text-white/70">
          Waiting for others to join…
        </Text>
      </div>
    </div>
  );
}
