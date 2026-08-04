import { Text } from "@/components/ui";

interface SecretMissionCardProps {
  mission: string;
}

export function SecretMissionCard({
  mission,
}: SecretMissionCardProps) {
  return (
    <div
      className="
        w-full
        max-w-xl
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
        sm:p-7
      "
    >
      <Text className="text-xs uppercase tracking-[0.2em] text-white/40">
        Your secret mission
      </Text>

      <Text className="mt-5 text-lg font-medium leading-relaxed text-white sm:text-xl">
        {mission}
      </Text>

      <Text className="mt-5 text-sm leading-relaxed text-white/50">
        Keep this to yourself. Complete it
        naturally during the evening.
      </Text>
    </div>
  );
}
