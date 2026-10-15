"use client";

import { useActivity } from "@/hooks/useActivity";
import { ActivitySearch } from "@/components/activity/ActivitySearch";
import { ActivityList } from "@/components/activity/ActivityList";

export function ActivityFeed() {
  const { activity, filteredActivity, query, error, setQuery, fetchActivity } = useActivity();

  return (
    <section className="stack">
      <section className="card" style={{ padding: "1rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Activity Feed</h1>
        <ActivitySearch value={query} onChange={setQuery} />
      </section>

      <section className="card" style={{ padding: "1rem" }}>
        <small style={{ color: "var(--muted)" }}>
          Total: {activity.length} | Visible: {filteredActivity.length}
        </small>
      </section>

      {error ? (
        <section className="card" style={{ padding: "1rem", borderColor: "#e3b4c0", background: "#fff8fa" }}>
          <p style={{ marginTop: 0, marginBottom: "0.75rem", color: "var(--danger)" }}>{error}</p>
          <button type="button" className="button" onClick={fetchActivity}>
            Retry
          </button>
        </section>
      ) : (
        <ActivityList activity={filteredActivity} />
      )}
    </section>
  );
}
