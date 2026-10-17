import type { TaskFilter } from "@/types/api";

const NOTE_CLASS =
  "flex w-32 cursor-pointer flex-col items-start gap-1 rounded-md border px-4 py-2.5 text-left text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary/35 aria-pressed:shadow-lg lg:w-full";

const FILTERS: Array<{
  label: string;
  value: TaskFilter;
  noteClass: string;
  tiltClass: string;
}> = [
  {
    label: "All",
    value: "all",
    noteClass: "border-secondary/80 bg-secondary/70",
    tiltClass: "-rotate-1",
  },
  {
    label: "Done",
    value: "completed",
    noteClass: "border-info/80 bg-info/60",
    tiltClass: "rotate-1",
  },
  {
    label: "Left",
    value: "pending",
    noteClass: "border-line bg-surface",
    tiltClass: "-rotate-[0.5deg]",
  },
];

type StatusFilterProps = {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
  counts: Record<TaskFilter, number>;
};

export function StatusFilter({ value, onChange, counts }: StatusFilterProps) {
  return (
    <section
      aria-label="Filter tasks by status"
      className="flex flex-wrap items-start gap-3 lg:w-44 lg:shrink-0 lg:flex-col lg:flex-nowrap"
    >
      {FILTERS.map((filter) => {
        const active = filter.value === value;
        const count = counts[filter.value];

        return (
          <button
            key={filter.value}
            type="button"
            className={`${NOTE_CLASS} ${filter.noteClass} ${
              active ? "rotate-0" : filter.tiltClass
            }`}
            onClick={() => onChange(filter.value)}
            aria-pressed={active}
            aria-controls="ledger"
          >
            <span className="font-hand text-2xl leading-none">
              {filter.label}
            </span>
            <span className="text-xs text-muted-ink tabular-nums">
              {count} {count === 1 ? "task" : "tasks"}
            </span>
          </button>
        );
      })}
    </section>
  );
}
