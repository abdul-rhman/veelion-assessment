import type { ActivityLog } from "@/types/api";
import { ActivityItem } from "@/components/activity/ActivityItem";

type ActivityListProps = {
  activity: ActivityLog[];
};

export function ActivityList({ activity }: ActivityListProps) {
  return (
    <section className="card" style={{ padding: "1rem" }}>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0.7rem" }}>
        {activity.map((item) => (
          <ActivityItem key={item.id} activity={item} />
        ))}
      </ul>
    </section>
  );
}
