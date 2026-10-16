import type { TasksSummary } from "@/types/api";

const STATUSES: Array<{ key: keyof TasksSummary["byStatus"]; label: string }> = [
  { key: "todo", label: "To do" },
  { key: "in-progress", label: "In progress" },
  { key: "done", label: "Done" },
];

type StatusBreakdownProps = {
  byStatus: TasksSummary["byStatus"];
};

export function StatusBreakdown({ byStatus }: StatusBreakdownProps) {
  const total = STATUSES.reduce((sum, status) => sum + byStatus[status.key], 0);

  return (
    <section className="card" style={{ padding: "1rem" }}>
      <h2 style={{ marginTop: 0, marginBottom: "0.75rem" }}>Tasks by status</h2>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.7rem" }}>
        {STATUSES.map((status) => {
          const value = byStatus[status.key];
          const percent = total > 0 ? Math.round((value / total) * 100) : 0;

          return (
            <li key={status.key} style={{ display: "grid", gap: "0.3rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "0.8rem" }}>
                <span>{status.label}</span>
                <span className="badge">{value}</span>
              </div>
              <div
                style={{
                  background: "var(--chip)",
                  borderRadius: 999,
                  height: 8,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${percent}%`,
                    height: "100%",
                    background: "var(--primary)",
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
