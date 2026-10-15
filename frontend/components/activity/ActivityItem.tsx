import type { ActivityLog } from "@/types/api";

type ActivityItemProps = {
  activity: ActivityLog;
};

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <li style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.6rem" }}>
      <div style={{ fontWeight: 600 }}>{activity.action || "(no action)"}</div>
      <div>{activity.info || "(no info)"}</div>
      <small style={{ color: "var(--muted)" }}>
        {new Date(activity.when).toLocaleString()}
      </small>
    </li>
  );
}
