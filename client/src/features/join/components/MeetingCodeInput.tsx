type MeetingCodeInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function MeetingCodeInput({
  value,
  onChange,
}: MeetingCodeInputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Meeting code"
      className="
        h-11 w-full rounded-xl
        border border-white/10
        bg-white/5
        px-4
        text-white
        outline-none
        transition-colors
        placeholder:text-white/30
        focus:border-white/30
      "
    />
  );
}
