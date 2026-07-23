import { Button } from "@/components/ui";

interface ReflectionActionsProps {
  onContinue: () => void;
}

export function ReflectionActions({
  onContinue,
}: ReflectionActionsProps) {
  return (
    <div className="mt-8 flex justify-center">
      <Button onClick={onContinue}>
        Find another conversation
      </Button>
    </div>
  );
}
