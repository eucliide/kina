import { Button, Text } from "@/components/ui";

interface ParticipantCardProps {
  name: string;
}

export function ParticipantCard({ name }: ParticipantCardProps) {
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
        <Text className="font-medium text-white">
          {name}
        </Text>

        <Text className="mt-1 text-sm text-white/60">
          Available to talk
        </Text>
      </div>

      <Button>
        Invite
      </Button>
    </div>
  );
}
