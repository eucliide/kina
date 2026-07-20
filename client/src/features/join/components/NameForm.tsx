import { Button } from "@/components/ui";

type NameFormProps = {
  onContinue?: () => void;
};

export function NameForm({ onContinue }: NameFormProps) {
  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="First name"
        className="
          h-12
          w-full
          rounded-xl
          border
          border-white/10
          bg-white/5
          px-4
          text-white
          outline-none
          transition-colors
          placeholder:text-white/40
          focus:border-blue-500
        "
      />

      <Button
        className="w-full"
        onClick={onContinue}
      >
        Continue
      </Button>

    </div>
  );
}
