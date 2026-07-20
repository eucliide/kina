import { Button } from "@/components/ui";

type ConversationCardProps = {
  question?: string;
};

export function ConversationCard({
  question = "What is something you've always wanted to learn?",
}: ConversationCardProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-8
      "
    >
      <p className="text-sm uppercase tracking-[0.2em] text-white/40">
        Conversation
      </p>

      <h2 className="mt-6 text-3xl font-semibold leading-tight">
        {question}
      </h2>

      <p className="mt-8 text-sm text-white/50">
        02:30 remaining
      </p>

      <Button className="mt-8 w-full">
        Start Conversation
      </Button>
    </div>
  );
}
