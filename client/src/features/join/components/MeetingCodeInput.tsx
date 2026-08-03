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
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder="Enter meeting code"
      className="
        h-12 w-full rounded-xl
        border border-white/10
        bg-white/5
        px-4
        text-white
        outline-none
        placeholder:text-white/40
        focus:border-blue-500
      "
    />
  );
}
