"use client";

import { useReports } from "@/hooks/useReports";
import { SummaryStatCard } from "@/components/reports/SummaryStatCard";
import { StatusBreakdown } from "@/components/reports/StatusBreakdown";

export function ReportsSummary() {
  const { summary, loading, error, fetchSummary } = useReports();

  return (
    <section className="stack">
      <header className="card" style={{ padding: "1rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Reports</h1>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Summary of tasks and activity.
        </p>
      </header>

      {loading ? (
        <section className="card" style={{ padding: "1rem" }}>
          <p style={{ margin: 0 }}>Loading report...</p>
        </section>
      ) : null}

      {error ? (
        <section className="card" style={{ padding: "1rem", borderColor: "#e3b4c0", background: "#fff8fa" }}>
          <p style={{ marginTop: 0, marginBottom: "0.75rem", color: "var(--danger)" }}>{error}</p>
          <button type="button" className="button" onClick={fetchSummary}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error && summary ? (
        <>
          <section
            className="stack"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
          >
            <SummaryStatCard label="Total tasks" value={summary.total} />
            <SummaryStatCard
              label="Recent activity"
              value={summary.recentActivityCount}
              hint="Last 7 days"
            />
          </section>

          <StatusBreakdown byStatus={summary.byStatus} />
        </>
      ) : null}
    </section>
  );
}
