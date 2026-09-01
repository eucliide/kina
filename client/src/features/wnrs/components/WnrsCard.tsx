import { motion } from "framer-motion";

import { Heading, Label, Text } from "@/components/ui";

interface WnrsCardProps {
  prompt: string;
}

export function WnrsCard({
  prompt,
}: WnrsCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:p-8"
    >
      <Label>One last thing</Label>

      <Heading className="mt-4">
        Share something real.
      </Heading>

      <Text className="mx-auto mt-3 max-w-lg">
        Take a moment with each other.
        Answer honestly, then give the
        other person space to share.
      </Text>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-6 sm:mt-8 sm:px-8 sm:py-7">
        <Text className="text-base leading-relaxed text-white sm:text-lg">
          {prompt}
        </Text>
      </div>
    </motion.section>
  );
}
