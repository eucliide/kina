import { Text } from "@/components/ui";

interface WnrsActionsProps {
  onContinue: () => void;
}

export function WnrsActions({
  onContinue,
}: WnrsActionsProps) {
  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={onContinue}
        className="
          rounded-full
          border
          border-white/15
          bg-white/5
          px-6
          py-3
          text-sm
          font-medium
          text-white
          transition
          hover:bg-white/10
        "
      >
        <Text>Continue</Text>
      </button>
    </div>
  );
}
