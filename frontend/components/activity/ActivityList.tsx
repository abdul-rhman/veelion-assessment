import { FaHistory } from "react-icons/fa";
import type { ActivityLog } from "@/types/api";
import { ActivityItem } from "@/components/activity/ActivityItem";
import { EmptyState } from "@/components/shared/EmptyState";

type ActivityListProps = {
  activity: ActivityLog[];
  onEdit: (activity: ActivityLog) => void;
};

export function ActivityList({ activity, onEdit }: ActivityListProps) {
  if (activity.length === 0) {
    return (
      <EmptyState
        icon={FaHistory}
        title="Nothing found"
        hint="No entries match your search, try a different word."
      />
    );
  }

  return (
    <section className="card overflow-hidden">
      <ul className="m-0 list-none divide-y divide-line p-0">
        {activity.map((item) => (
          <ActivityItem key={item.id} activity={item} onEdit={onEdit} />
        ))}
      </ul>
    </section>
  );
}
