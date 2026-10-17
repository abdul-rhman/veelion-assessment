import { FaSearch } from "react-icons/fa";

type ActivitySearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ActivitySearch({ value, onChange }: ActivitySearchProps) {
  return (
    <div className="relative">
      <FaSearch
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-ink"
      />
      <input
        type="search"
        className="input pl-11"
        placeholder="Search the log"
        aria-label="Search the log"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
