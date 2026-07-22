interface RoundIndicatorProps {
  round: number;
}

export function RoundIndicator({
  round,
}: RoundIndicatorProps) {
  return (
    <div className="mb-8 flex justify-center gap-3">
      {[1, 2, 3].map((item) => (
        <span
          key={item}
          className={[
            "h-2.5 w-2.5 rounded-full transition-all duration-300",
            item <= round
              ? "bg-white"
              : "bg-white/20",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
