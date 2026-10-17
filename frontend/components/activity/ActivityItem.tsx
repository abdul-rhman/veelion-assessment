import { FaPen } from "react-icons/fa";
import type { ActivityLog } from "@/types/api";

type ActivityItemProps = {
  activity: ActivityLog;
  onEdit: (activity: ActivityLog) => void;
};

export function ActivityItem({ activity, onEdit }: ActivityItemProps) {
  return (
    <li className="flex items-start gap-3 p-4 transition-colors hover:bg-background/70">
      <span
        aria-hidden
        className="mt-1.5 size-2.5 shrink-0 rounded-full bg-accent"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold text-ink">
          {activity.action || "(no action)"}
        </span>
        <span className="text-sm text-muted-ink">
          {activity.info || "(no info)"}
        </span>
        <small className="text-xs text-muted-ink">
          {new Date(activity.when).toLocaleString()}
        </small>
      </div>

      <button
        type="button"
        onClick={() => onEdit(activity)}
        aria-label={`Edit ${activity.action || "entry"}`}
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-ink transition-colors hover:bg-background hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <FaPen aria-hidden className="size-3" />
      </button>
    </li>
  );
}
