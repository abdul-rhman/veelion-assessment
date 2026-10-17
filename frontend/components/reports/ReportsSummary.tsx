"use client";

import { useReports } from "@/hooks/useReports";
import { SummaryStatCard } from "@/components/reports/SummaryStatCard";
import { StatusBreakdown } from "@/components/reports/StatusBreakdown";
import { PageHeader } from "@/components/shared/PageHeader";
import { ErrorBanner } from "@/components/shared/ErrorBanner";

export function ReportsSummary() {
  const { summary, loading, error, fetchSummary } = useReports();

  return (
    <section className="stack">
      <PageHeader
        title="The Numbers"
        subtitle="Your tasks and the last seven days, counted up."
      />

      {loading ? (
        <section className="card p-4" aria-busy="true">
          <p className="m-0 animate-pulse font-hand text-xl text-muted-ink">
            Counting things up...
          </p>
        </section>
      ) : null}

      {error ? <ErrorBanner message={error} onRetry={fetchSummary} /> : null}

      {!loading && !error && summary ? (
        <>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryStatCard label="Tasks pinned" value={summary.total} />
            <SummaryStatCard
              label="Checked off"
              value={summary.byStatus.done}
              hint="All time"
            />
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
