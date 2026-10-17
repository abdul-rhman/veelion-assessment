import { FaChartBar } from "react-icons/fa";
import type { TasksSummary } from "@/types/api";
import { EmptyState } from "@/components/shared/EmptyState";

const STATUSES: Array<{
  key: keyof TasksSummary["byStatus"];
  label: string;
  barClass: string;
}> = [
  { key: "todo", label: "To do", barClass: "bg-info" },
  { key: "in-progress", label: "In progress", barClass: "bg-accent" },
  { key: "done", label: "Done", barClass: "bg-primary" },
];

type StatusBreakdownProps = {
  byStatus: TasksSummary["byStatus"];
};

export function StatusBreakdown({ byStatus }: StatusBreakdownProps) {
  const total = STATUSES.reduce((sum, status) => sum + byStatus[status.key], 0);

  if (total === 0) {
    return (
      <EmptyState
        icon={FaChartBar}
        title="Nothing to count yet"
        hint="Pin a few tasks and the numbers will show up here."
      />
    );
  }

  return (
    <section className="card p-6">
      <h2 className="m-0 mb-5 font-heading text-xl font-semibold text-ink">
        Where things stand
      </h2>

      <ul className="m-0 grid list-none gap-4 p-0">
        {STATUSES.map((status) => {
          const value = byStatus[status.key];
          const percent = Math.round((value / total) * 100);

          return (
            <li key={status.key} className="grid gap-1.5">
              <div className="flex items-center justify-between gap-3 text-sm font-medium text-ink">
                <span>{status.label}</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs text-muted-ink">{percent}%</span>
                  <span className="badge">{value}</span>
                </span>
              </div>

              <div
                className="h-2 w-full overflow-hidden rounded-full bg-background"
                role="progressbar"
                aria-label={`${status.label} tasks`}
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={total}
              >
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ${status.barClass}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
