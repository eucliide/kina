import { Button } from "@/components/ui";

interface WnrsActionsProps {
  onContinue: () => void;
}

export function WnrsActions({
  onContinue,
}: WnrsActionsProps) {
  return (
    <div className="mt-8 flex justify-center">
      <Button variant="ghost" onClick={onContinue}>
        Continue
      </Button>
    </div>
  );
}
